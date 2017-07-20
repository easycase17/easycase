/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 2,
    up: function () {
        const law_options = {
            field: "law",
            options: [
                { label: "Civil Rights", value: "Civil Rights" },
                { label: "Corporate and Securities Law", value: "Corporate and Securities Law" },
                { label: "Criminal Law", value: "Criminal Law" },
                { label: "Education Law", value: "Education Law" },
                { label: "Employment and Labor Law", value: "Employment and Labor Law" },
                { label: "Environmental and Natural Resources Law", value: "Environmental and Natural Resources Law" },
                { label: "Family and Juvenile Law", value: "Family and Juvenile Law" },
                { label: "Health Law", value: "Health Law" },
                { label: "Immigration Law", value: "Immigration Law" },
                { label: "Intellectual Property Law", value: "Intellectual Property Law" },
                { label: "International Law", value: "International Law" },
                { label: "Real Estate Law", value: "Real Estate Law" },
                { label: "Sports and Entertainment Law", value: "Sports and Entertainment Law" },
                { label: "Tax Law", value: "Tax Law" }
            ]
        };

        Options.insert(law_options);

    },
    down: function () { }
})
