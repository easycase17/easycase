import * as Azure from 'azure-storage';
import * as fs from 'fs';
import { execFile } from 'child_process';

var rootPath = process.env.PWD;
var pdfTpltPath = `${rootPath}/private/pdfTemplates`;

var share = 'lawforms';
var fdfTempDir = 'fdfTemplates';
var original = 'original';

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
    execute: (formType, data, callback) => {
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

        // Generate randomized file prefix
        let randomSequence = Math.random().toString(36).substring(7);
        let currentTime = new Date().getTime();
        let prefix = currentTime + '_' + randomSequence;

        // create Azure file service
        let AzureFile = Azure.createFileService()

        // Fetch the required form
        AzureFile.getFileToText(share, fdfTempDir, `${data.year}_${formType}.fdf`, function (error, result, response) {
            if (!error) {
                // file retrieved
                const util = require('util');
                // render the fdf
                let content = util.format(result, data.first_name, data.last_name);
                // Create the user directory if not exists
                AzureFile.createDirectoryIfNotExists(share, `users/${data.userId}`, function (error, result, response) {
                    if (!error) {
                        // Write the res to a new file in PDFTK onto Azure
                        AzureFile.createFileFromText(share, `users/${data.userId}`, `${prefix}_${data.userId}_${data.year}_${formType}.fdf`, content, function (error, result, response) {
                            console.log(error);
                        });

                        fs.writeFileSync(`/tmp/${prefix}_${data.userId}_${data.year}_${formType}.fdf`, content);

                        // Get the empty pdf
                        AzureFile.getFileToLocalFile(share, original, `${data.year}_${formType}.pdf`, `/tmp/${prefix}_${data.year}_${formType}.pdf`, function (error, serverFile) {
                            if (!error) {
                                // file available in serverFile.file variable
                                // Generate PDF
                                const args = [
                                    `/tmp/${prefix}_${data.year}_${formType}.pdf`,
                                    'fill_form',
                                    `/tmp/${prefix}_${data.userId}_${data.year}_${formType}.fdf`,
                                    'output',
                                    `/tmp/${prefix}_${data.userId}_${data.year}_${formType}.pdf`
                                ];

                                execFile('pdftk', args, { encoding: 'binary', maxBuffer: 1024 * 1000 }, function pdftkCallback(error, stdout, stderr) {
                                    if (error) {
                                        if (error.code === "ENOENT") {
                                            // callback('Could not find pdftk executable');
                                        }
                                        else {
                                            // callback(error);
                                        }
                                    } else {
                                        // callback(error);
                                        // Upload the output file to Azure
                                        AzureFile.createFileFromLocalFile(share, `users/${data.userId}`, `${prefix}_${data.userId}_${data.year}_${formType}.pdf`, `/tmp/${prefix}_${data.userId}_${data.year}_${formType}.pdf`, function (error, result, response) {
                                            // delete local tmp file
                                            fs.unlinkSync(`/tmp/${prefix}_${data.userId}_${data.year}_${formType}.pdf`);
                                            if (error) throw error;
                                        })
                                        fs.unlink(`/tmp/${prefix}_${data.userId}_${data.year}_${formType}.fdf`);
                                        fs.unlink(`/tmp/${prefix}_${data.year}_${formType}.pdf`);
                                    }
                                });
                            }
                        });
                    }
                });
            }
            console.log(error);
        });
    }
};

module.exports = ECTaxFilling;