MapApp.controller('MapController', function MapController($scope, $http) {

    $http.get('/includes/dataGetter.php?floor')
    .then(x => {

        

        let buildingData = {
            features: x.data.floor
        };
        console.log(buildingData);

        let roomsData = {
            features: x.data.rooms
        }

        let desksData = {
            features: x.data.desks
        }

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
                size: 50,
                dataSource: desksData,
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
});