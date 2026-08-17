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

if(typeof params.googleAds !== 'undefined')
{
    gtag('config', params.googleAds);
}
