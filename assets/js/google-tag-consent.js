// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Default ad_storage and analytics_storage to 'denied' to disable cookies
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
});
