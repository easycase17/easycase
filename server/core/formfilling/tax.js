import { Meteor } from 'meteor/meteor';
import { PDFTK } from 'meteor/pdftk:pdftk';
import { SSR } from 'meteor/meteorhacks:ssr';

var rootPath = process.env.PWD;
var pdfTpltPath = `${rootPath}/private/pdfTemplates`;
var pdfOutputPath = `${rootPath}/../output`;

var ECTaxFilling = {
    form1040: (data) => {
        // Check data
        if (data) {
            // First check if there is userId to check token
            if (!data.userId) {
                throw Error('No valid userId when using ECTaxFilling module, form1040 function');
            }

            // If there is no year sepified, set default year to 2016
            if (!data.year) {
                data = {
                    year: '2016'
                }
            }
        } else {
            throw Error('Invalid data when using ECTaxFilling module, form1040 function');
        }

        // Fetch the required form
        var content = Assets.getText(`pdfTemplates/fdfTemplates/${data.year}_F1040.fdf`);
        // Get util internal API
        const util = require('util');
        content = util.format(content, data.first_name, data.last_name);

        // Write the res into a new file for PDFTK
        var fs = require('fs');
        fs.writeFileSync(`${pdfOutputPath}/fdfTemplates/${data.userId}_${data.year}_F1040.fdf`, content);

        PDFTK.execute(
            [
                `${pdfTpltPath}/original/${data.year}_F1040.pdf`,
                'fill_form',
                `${pdfOutputPath}/fdfTemplates/${data.userId}_${data.year}_F1040.fdf`,
                'output',
                `${pdfOutputPath}/output/${data.userId}_${data.year}_F1040.pdf`
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