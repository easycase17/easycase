/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 3,
    up: function () {
        var language_options = {
            field: "language",
            options: [
                { label: "English", value: "EN" },
                { label: "中文", value: "ZH" },
                { label: "Français", value: "FR" }
            ]
        };

        Options.insert(language_options);
    },
    down: function () { }
})