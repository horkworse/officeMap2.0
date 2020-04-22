"use strict";
MapApp.controller('MapController', function MapController($scope, $http, $location) {
    
    /*Меню октрытие*/
    openNav();

    /*Сайд бар*/
    slide();
    
    /* Selct выбор иконки */
    changeStatus();

    /*Недо пасхалка, потом зафигачим норм пасхалку*/
    onKonamiCode(function () {alert('Ты лох!!!')});
    
    /* харним данные о юзере */
    $scope.user = JSON.parse(localStorage.getItem('user'));

    /* выход юзера из учетки*/
    $scope.logout = function () {
        $http.post('/includes/dataGetter.php', {logout: true});
        localStorage.removeItem('user');
        $location.path('/sign-in');
    }

    /* карта */
    $http.post('/includes/dataGetter.php', {desks: true})
    .then(x => {
        
        /* формируем объекты с данными о этаже, комнатах и столах */
        let buildingData = {
            features: x.data.floor
        };

        let roomsData = {
            features: x.data.rooms
        }

        let desksData = {
            features: x.data.desks
        }

        /* подгрузка карты */
        $scope.vectorMapOptions = {
            controlBar: {
                enabled: false
            },
            maxZoomFactor: 10,
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
            /* вывод popUp при наведении выши на стол */
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