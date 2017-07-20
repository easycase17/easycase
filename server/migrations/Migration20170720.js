/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 2,
    up: function () {
        const options = [
            "Civil Rights",
            "Corporate and Securities Law",
            "Criminal Law",
            "Education Law",
            "Employment and Labor Law",
            "Environmental and Natural Resources Law",
            "Family and Juvenile Law",
            "Health Law",
            "Immigration Law",
            "Intellectual Property Law",
            "International Law",
            "Real Estate Law",
            "Sports and Entertainment Law",
            "Tax Law"
        ];

        FieldsOfLaw = new Mongo.Collection('ec_law_fields');
        FieldsOfLaw.insert(options);

    },
    down: function () { }
})