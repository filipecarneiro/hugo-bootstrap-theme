import params from "@params";

// Google tag (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', params.measurementId);

if(typeof params.googleAds !== 'undefined')
{
    gtag('config', params.googleAds);
}
