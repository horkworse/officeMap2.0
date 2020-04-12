"use strict";
MapApp.controller('MapController', function MapController($scope, $http) {
    $http.post('/includes/dataGetter.php', {desks: true})
    .then(x => {
        let buildingData = {
            features: x.data.floor
        };

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
                size: 60,
                dataSource: desksData,
                name: "desks"
            }],
            loadingIndicator: {
                show: true
            },
            tooltip: {
                enabled: true,
                contentTemplate: (info, container) => {
                    if(info.layer.name === "desks") {
                        let popUp = document.createElement('div');
                        popUp.className = 'popUp';

                        let avatar = document.createElement('img');
                        avatar.className = 'avatar';
                        avatar.src = `/images/users/${info.attribute('avatar')}`;

                        let name = document.createElement('p');
                        name.innerText = info.attribute('user');

                        let post = document.createElement('span');
                        post.className = 'post';
                        post.innerText = info.attribute('post') + ' ';

                        name.prepend(post)
                        popUp.append(avatar);
                        popUp.append(name);
                        container.append(popUp);
                    }
                }
            }
        };
    });
});