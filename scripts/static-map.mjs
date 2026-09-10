/**
 * Generates the image used by the static-map shortcode.
 *
 * Stitches OpenStreetMap tiles into one picture and drops a marker in the
 * middle. Run it once, commit the result: the shortcode consumes a committed
 * image and fetches nothing at build time, which is the whole point of it
 * (an embedded map costs a third-party JavaScript stack on every visit).
 *
 * OpenStreetMap imagery is ODbL licensed, so whatever page shows the output
 * MUST credit "OpenStreetMap contributors". The shortcode does that for you
 * when you pass source="openstreetmap".
 *
 * Usage:
 *
 *   node scripts/static-map.mjs --lat=41.14961 --lon=-8.61099 \
 *     --out=exampleSite/assets/images/contact-map.png
 *
 * Options (defaults in brackets):
 *
 *   --lat, --lon  centre of the map, decimal degrees (required)
 *   --zoom        OSM zoom level [18]. Ground covered scales with the output
 *                 width: at zoom 18 a 2400px image spans roughly 1 km.
 *   --width       output width in pixels [2400]
 *   --height      output height in pixels [800]
 *   --marker      marker fill colour, or "none" [#c2471a]
 *   --out         file to write (required)
 */

import sharp from 'sharp'

const TILE = 256
const UA = 'hugo-bootstrap-theme static-map (https://github.com/FilipeCarneiro/hugo-bootstrap-theme)'

/** Web Mercator: longitude and latitude to global pixel coordinates. */
function project(lat, lon, zoom) {
  const scale = 2 ** zoom * TILE
  const latRad = (lat * Math.PI) / 180
  return {
    x: ((lon + 180) / 360) * scale,
    y: ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale,
  }
}

function markerSvg(fill) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24">
      <path d="M12 0.75c-4.28 0-7.75 3.47-7.75 7.75 0 5.8 7.75 14.75 7.75 14.75s7.75-8.95 7.75-14.75c0-4.28-3.47-7.75-7.75-7.75z"
            fill="${fill}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="12" cy="8.5" r="3" fill="#ffffff"/>
    </svg>`,
  )
}

/**
 * @param {{lat:number, lon:number, zoom:number, width:number, height:number, marker:string, out:string}} opts
 */
export async function buildStaticMap({ lat, lon, zoom, width, height, marker, out }) {
  const centre = project(lat, lon, zoom)
  const left = centre.x - width / 2
  const top = centre.y - height / 2
  const tx0 = Math.floor(left / TILE)
  const ty0 = Math.floor(top / TILE)
  const tx1 = Math.floor((left + width - 1) / TILE)
  const ty1 = Math.floor((top + height - 1) / TILE)

  const wanted = []
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) wanted.push({ tx, ty })
  }

  const fetchTile = async ({ tx, ty }) => {
    const url = `https://tile.openstreetmap.org/${zoom}/${tx}/${ty}.png`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
    return {
      input: Buffer.from(await res.arrayBuffer()),
      left: (tx - tx0) * TILE,
      top: (ty - ty0) * TILE,
    }
  }

  /* Four at a time: quick enough, and gentle on a tile server that asks not to
     be hammered. See https://operations.osmfoundation.org/policies/tiles/ */
  const tiles = []
  for (let i = 0; i < wanted.length; i += 4) {
    tiles.push(...(await Promise.all(wanted.slice(i, i + 4).map(fetchTile))))
  }

  const stitched = await sharp({
    create: {
      width: (tx1 - tx0 + 1) * TILE,
      height: (ty1 - ty0 + 1) * TILE,
      channels: 3,
      background: '#ffffff',
    },
  })
    .composite(tiles)
    .png()
    .toBuffer()

  const overlays =
    marker === 'none'
      ? []
      : [
          {
            input: markerSvg(marker),
            left: Math.round(width / 2 - 36),
            top: Math.round(height / 2 - 72),
          },
        ]

  /* Palette encoding: map tiles use few colours, so this roughly halves the
     committed file with no visible loss. */
  await sharp(stitched)
    .extract({
      left: Math.round(left - tx0 * TILE),
      top: Math.round(top - ty0 * TILE),
      width,
      height,
    })
    .composite(overlays)
    .png({ palette: true, quality: 90, effort: 10 })
    .toFile(out)

  return { tiles: tiles.length, width, height, out }
}

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit === undefined ? fallback : hit.slice(name.length + 3)
}

const lat = Number(arg('lat'))
const lon = Number(arg('lon'))
const out = arg('out')

if (!Number.isFinite(lat) || !Number.isFinite(lon) || !out) {
  console.error('Usage: node scripts/static-map.mjs --lat=<deg> --lon=<deg> --out=<file> [--zoom] [--width] [--height] [--marker]')
  process.exit(1)
}

const result = await buildStaticMap({
  lat,
  lon,
  out,
  zoom: Number(arg('zoom', 18)),
  width: Number(arg('width', 2400)),
  height: Number(arg('height', 800)),
  marker: arg('marker', '#c2471a'),
})

console.log(`static-map: ${result.tiles} tiles -> ${result.out} (${result.width}x${result.height})`)
