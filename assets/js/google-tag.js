import params from "@params";

// Google tag (gtag.js).
//
// window.dataLayer is qualified on both sides: js.Build wraps this file in an IIFE, so an
// unqualified `dataLayer` only resolves by walking the scope chain out to the global object.
// It happens to work, but it makes the file depend on how the bundler wraps it.
//
// The assignment stays even though google-tag-consent.js does the same thing, because that
// file is not emitted when googleTag.cookies is true.
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', params.measurementId);

// Truthy check rather than typeof: head/google-tag.html always defines googleAds, falling
// back to an empty string when the site sets no value, and "" is not 'undefined'. A typeof
// guard therefore let through a gtag('config', '') call carrying no ID at all.
if(params.googleAds)
{
    gtag('config', params.googleAds);
}
