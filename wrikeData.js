(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();






    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
                id: "id",
                dataType: tableau.dataTypeEnum.string
        }, {
                id: "accountId",
                alias: "Account Number",
                dataType: tableau.dataTypeEnum.string
        }, {
                id: "title",
                alias: "title",
                dataType: tableau.dataTypeEnum.string
        }, {
                id: "startDate",
                dataType: tableau.dataTypeEnum.date
        },
            {
                id: "endDate",
                dataType: tableau.dataTypeEnum.date
        },
            {
                id: "status",
                alias: "Status",
                dataType: tableau.dataTypeEnum.string
        },
            {
                id: "permalink",
                alias: "permalink",
                dataType: tableau.dataTypeEnum.string
        },
            {
                id: "ownerIds",
                alias: "ownerIds",
                dataType: tableau.dataTypeEnum.string
        }

                   ];

        var tableSchema = {
            id: "wrikeDataFeed",
            alias: "Wrike Data Feed",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };






    // Download the data
    myConnector.getData = function (table, doneCallback) {



        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.wrike.com/api/v3/folders?project=1&fields=['customFields']",
            "method": "GET",
            "headers": {
                "Authorization": "bearer lDydxqdGk5BzCZT6wZEP76TSEYLAUqWAaWyPg8v0J1gbaFoUGsshemfJwUopGh7W-N-WFIUKC",
                "Cache-Control": "no-cache",

            }
        }

        $.ajax(settings).done(function (response) {

            console.log(response.data)

            var feat = response.data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "accountId": feat[i].accountId,
                    "title": feat[i].title,
                    "startDate": feat[i].project.startDate,
                    "endDate": feat[i].project.endDate,
                    "status": feat[i].project.status,
                    "ownerIds": feat[i].project.ownerIds[0],
                    "permalink": feat[i].permalink


                });
            }
            table.appendRows(tableData);
            doneCallback();

        });

    };



    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Wrike Projects Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });


})();