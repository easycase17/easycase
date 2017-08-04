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

        var content = 
        `%FDF-1.2
        1 0 obj<</FDF<< /Fields[
        <</T(topmostSubform[0].Page1[0].f1_04[0])/V(${data.first_name})>>
        <</T(topmostSubform[0].Page1[0].f1_05[0])/V(${data.last_name})>>
        <</T(topmostSubform[0].Page1[0].f1_06[0])/V(781\t58\t0213)>>
        <</T(topmostSubform[0].Page1[0].f1_07[0])/V(Jiayi)>>
        <</T(topmostSubform[0].Page1[0].f1_08[0])/V(Kou)>>
        <</T(topmostSubform[0].Page1[0].SpouseSSN[0].f1_09[0])/V(781\t58\t0213)>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1-10[0])/V(440 S Chauncey Ave.)>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1-11[0])/V(13)>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1-12[0])/V(West Lafayette, IN, 47906)>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1_13[0])/V()>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1_14[0])/V()>>
        <</T(topmostSubform[0].Page1[0].Address[0].f1_15[0])/V()>>
        ] >> >>
        endobj
        trailer
        <</Root 1 0 R>>
        %%EOF`

        // Write the res into a new file for PDFTK
        var fs = require('fs');
        fs.writeFileSync(`${pdfOutputPath}/fdfTemplates/${data.userId}_${data.year}_F1040.fdf`, content);

        PDFTK.execute(
            [
                `${pdfTpltPath}/original/${data.year}_F1040.pdf`,
                'fillform',
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