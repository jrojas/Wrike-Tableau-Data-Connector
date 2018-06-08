(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
             var cols =[{id: "id",dataType: tableau.dataTypeEnum.string},{title: "title",
                dataType: tableau.dataTypeEnum.string
            }
        ]

    };

    myConnector.getData = function (table, doneCallback) {
                 $.getJSON("https://www.wrike.com/api/v3/accounts/IEAB4KJ4/folders", function(resp) {
        var feat = resp.data,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": data[i].id,
                "title": feat[i].title
                
            });
        }

        table.appendRows(tableData);
        doneCallback();
    })

    };

    tableau.registerConnector(myConnector);
})();