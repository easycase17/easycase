/**
 * @author Guocheng Wei <walterwei170@gmail.com>
 * 
 * Easycase
 */

Migrations.add({
    version: 4,
    up: function () {
        var searchTimeOptions = {
            field: "searchTime",
            options: [
                { label: "Any Time", value: "0" },
                { label: "Last 24 Hours", value: "1" },
                { label: "Past Week", value: "7" },
                { label: "Past Month", value: "30" },
                { label: "Past Year", value: "365" }
            ]
        };

        Collections.Options.insert(searchTimeOptions);
    },
    down: function () { }
});