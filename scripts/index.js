var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
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
            // borderColor: '#123424',
            dataSource: buildingData,
            name: "building",
            center: [-145, -10] /* doesnt work*/
        }, {
            color: "#ff0000",
            borderColor: "#123424",
            borderWidth: 1,
            label: {
                enabled: true,
                dataField: "name"
            },
            dataSource: roomsData,
            name: "rooms"
        }],
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                if(arg.layer.name === "rooms")
                    return { text: "Square: " + arg.attribute("square") + " m&#178" };
            }
        }
    };
});