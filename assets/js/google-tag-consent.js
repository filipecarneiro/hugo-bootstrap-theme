// Consent Mode defaults, loaded before gtag.js so the tag library never initialises under
// implicit consent. See head/google-tag.html for why the script order is guaranteed with
// `defer` and why `async` cannot be used here.
//
// Every type defaults to 'denied', which makes the tag send cookieless pings and store
// nothing on the device. A site that presents a consent banner calls
// gtag('consent', 'update', {...}) from that banner once the visitor agrees; a site that
// wants to stay cookieless simply never does.
//
// window.dataLayer is qualified explicitly rather than relied on as a global: this file is
// minified in production and may be wrapped in a function scope, so it must not depend on
// running in global scope.
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    // Consent Mode v2, required for EEA traffic since March 2024 wherever ad features are in
    // use. Harmless on an analytics-only property, so it is set unconditionally.
    ad_user_data: 'denied',
    ad_personalization: 'denied'
});

// Deliberately no 'wait_for_update'. It pauses every tag for N milliseconds waiting for a
// banner to call 'update', so on a site that stays cookieless it would add latency to every
// page load in exchange for nothing. A site that adds a banner should set it there.
