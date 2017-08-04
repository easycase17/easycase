import { Meteor } from 'meteor/meteor';
import { PDFTK } from 'meteor/pdftk:pdftk';
import { SSR } from 'meteor/meteorhacks:ssr';

var rootPath = process.env.PWD;
var pdfTpltPath = `${rootPath}/private/pdfTemplates`;
var pdfOutputPath = `${rootPath}/../output`;

/**
 * For filling different kinds of tax files
 */
var ECTaxFilling = {
    /**
     * Regular execute filling functionality
     * 
     * @param   String  formType
     * @param   JSON    data    we assume the data is in valid and legal form
     * 
     * @important               Take case of data beforehand
     */
    execute: (formType, data) => {
        // Check data
        if (data) {
            // First check if there is userId to check token
            if (!data.userId) {
                throw Error('No valid userId when using ECTaxFilling module, execute function');
            }

            // If there is no year sepified, set default year to 2016
            if (!data.year) {
                data = {
                    year: '2016'
                }
            }
        } else {
            throw Error('Invalid data when using ECTaxFilling module, execute function');
        }

        // Check if the form type exists
        if (!formType || formType !== 'F1040' && formType !== 'F8833' && formType !== 'F8843') {
            throw Error('Invalid form formType when using ECTaxFilling module, execute function');
        }

        // Fetch the required form
        var content = Assets.getText(`pdfTemplates/fdfTemplates/${data.year}_${formType}.fdf`);
        // Get util internal API
        const util = require('util');
        content = util.format(content, data.first_name, data.last_name);

        // Write the res into a new file for PDFTK
        var fs = require('fs');
        fs.writeFileSync(`${pdfOutputPath}/fdfTemplates/${data.userId}_${data.year}_${formType}.fdf`, content);

        PDFTK.execute(
            [
                `${pdfTpltPath}/original/${data.year}_${formType}.pdf`,
                'fill_form',
                `${pdfOutputPath}/fdfTemplates/${data.userId}_${data.year}_${formType}.fdf`,
                'output',
                `${pdfOutputPath}/output/${data.userId}_${data.year}_${formType}.pdf`
            ],
            function (error, stdout, stderr) {
                if (error) console.log('Error:', error);
                else {
                    // success
                }
            }
        );
    }
};

module.exports = ECTaxFilling;