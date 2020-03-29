MapApp.controller('MapController', function MapController($scope) {
    $scope.vectorMapOptions = {
        maxZoomFactor: 4,
        projection: {
            to: function (coordinates) {
                return [coordinates[0] / 100, coordinates[1] / 100];
            },
    
            from: function (coordinates) {
                return [coordinates[0] * 100, coordinates[1] * 100];
            }
        },
        layers: [{
            hoverEnabled: false,
            dataSource: buildingData,
            name: "building"
        }, {
            color: "#fff",
            borderColor: "#123424",
            borderWidth: 1,
            label: {
                enabled: true,
                dataField: "name"
            },
            dataSource: roomsData,
            name: "rooms"
        }, {
            type: "marker",
            elementType: "image",
            dataField: "url",
            size: 51,
            dataSource: tablesData,
            name: "tables"
        }],
        loadingIndicator: {
            show: true
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                if(arg.layer.name === "rooms")
                    return { text: "Square: " + arg.attribute("square") + " ft&#178" };
            }
        }
    };
});