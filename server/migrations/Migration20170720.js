/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 2,
    up: function () {
        var law_options = {
            field: "law",
            options: [
                { label: "Civil Rights", value: "0" },
                { label: "Corporate and Securities Law", value: "1" },
                { label: "Criminal Law", value: "2" },
                { label: "Education Law", value: "3" },
                { label: "Employment and Labor Law", value: "4" },
                { label: "Environmental and Natural Resources Law", value: "5" },
                { label: "Family and Juvenile Law", value: "6" },
                { label: "Health Law", value: "7" },
                { label: "Immigration Law", value: "8" },
                { label: "Intellectual Property Law", value: "9" },
                { label: "International Law", value: "10" },
                { label: "Real Estate Law", value: "11" },
                { label: "Sports and Entertainment Law", value: "12" },
                { label: "Tax Law", value: "13" }
            ]
        };

        var gender_options = {
            field: "gender",
            options: [
                { label: "Male", value: "0" },
                { label: "Female", value: "1" },
                { label: "Prefer Not To Answer", value: "2" }
            ]
        };


        Collections.Options.insert(law_options);
        Collections.Options.insert(gender_options);

        // var cities_data = require('./us-cities');
        // USCitiesDetails = new Mongo.Collection('ec_uscities_details');
        // cities_data.forEach(function(city) {
        //     USCitiesDetails.insert(city);
        // });
    },
    down: function () { }
});