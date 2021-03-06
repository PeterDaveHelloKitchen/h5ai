const {win, jq, lo} = require('../globals');
const event = require('../core/event');
const allsettings = require('../core/settings');


const settings = lo.extend({
    enabled: false,
    baseURL: 'not-set',
    idSite: 0
}, allsettings['piwik-analytics']);

function init() {
    if (!settings.enabled) {
        return;
    }

    // reference: http://piwik.org/docs/javascript-tracking/

    const pkBaseURL = (win.location.protocol === 'https:' ? 'https://' : 'http://') + settings.baseURL + '/';
    let piwikTracker = null;

    jq('<script/>').attr('src', pkBaseURL + 'piwik.js').appendTo('body');
    jq(win).load(() => {
        piwikTracker = win.Piwik.getTracker(pkBaseURL + 'piwik.php', settings.idSite);
        piwikTracker.enableLinkTracking();
    });

    event.sub('location.changed', item => {
        const title = lo.map(item.getCrumb(), 'label').join(' > ');
        piwikTracker.trackPageView(title);
    });
}


init();
