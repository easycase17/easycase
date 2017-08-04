import './imports/startup/index.js';
import './imports/api/index.js';

/**
 * Collections only exist on server
 */
import './imports/collections/index.js';

Meteor.startup(() => {

    /**
     * Set up account services
     */
    var facebookConfig = Meteor.settings.private.oauth.facebook;
    var googleConfig = Meteor.settings.private.oauth.google;

    console.log('---------- Account Service Configuration ----------');
    if (facebookConfig) {
        console.log('Got settings for facebook', facebookConfig)
        configureFacebook(facebookConfig);
    }

    if (googleConfig) {
        console.log('Got settings for google', googleConfig)
        configureGoogle(googleConfig);
    }

    console.log('---------- Server Up ----------');

    ROOT_DIR_PATH = process.env.PWD;
    console.log(`Root path: ${ROOT_DIR_PATH}`);


    // @TODO delete
    var testPDF = require('./core/formfilling/tax.js');
    testPDF.form1040({userId: 'test', year: '2016', first_name: 'Guocheng', last_name: 'Wei'});
});