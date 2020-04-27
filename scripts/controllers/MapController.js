"use strict";
MapApp.controller('MapController', function MapController($scope, $http, $location) {
    
    let config = {
        maxZoom: 10,
        iconSize: 20
    }

    /*Меню октрытие*/
    openNav();

    /*Сайд бар*/
    slide();
    
    /* Selct выбор иконки */
    changeStatus();

    /*Недо пасхалка, потом зафигачим норм пасхалку*/
    onKonamiCode(function () {
        let fade = document.getElementById('fade');
        let pas = document.getElementById('pashalka');
        pas.style.display = 'flex';
        fade.style.display = 'block';
        pas.style.animation = `pas 0.7s ease`;

        fade.addEventListener('click', () => {
            pas.style.display = 'none';
            fade.style.display = 'none';
        }); 
    });
    
    /* харним данные о юзере */
    $scope.user = JSON.parse(localStorage.getItem('user'));

    /* выход юзера из учетки*/
    $scope.logout = function () {
        $http.post('/includes/dataGetter.php', {logout: true});
        localStorage.removeItem('user');
        $location.path('/sign-in');
    };


    $scope.statuses = [
        { name: "Не беспокоить", value: "0" },
        { name: "Отошел", value: "1" },
        { name: "Работает", value: "2" },
        { name: "Не работает", value: "3" }
    ];

    $scope.status = $scope.statuses.find(item => item.name=$scope.user.status);
    /* пока пусть будет так, потом оптимизирую и сделаю так, как вы планировали */

    
    $scope.editForm = function(user) {
        let form = document.querySelectorAll('.inputs');
        if (form[0].style.cursor == 'text')
        {
            $http.post('/includes/dataGetter.php', {
                update: true,
                data: {
                    id: user.id,
                    social: user.social,
                    phone: user.phone
                }
            })
            .then(x => console.log(x.data));
            localStorage.user = JSON.stringify($scope.user);
        }
        form.forEach(function(item) {
            item.toggleAttribute('readonly');
            item.style.cursor = (item.style.cursor == 'text') ? '' : 'text';
            // item.style.borderBottom  = (item.style.borderBottom  == '') ? '1px solid #000' : '';
            if(item.style.borderBottom  == ''){
                item.style.borderBottom = '2px solid rgba(0,0,0,.5)';
                item.style.animation = `sideBarLinksBorder 0.2s ease`;
            }else{
                item.style.borderBottom  = '';
                item.style.animation = `sideBarLinksUnBorder 0.2s ease`;
            }
            
        });
    };

    /* карта */
    $http.post('/includes/dataGetter.php', {desks: true})
    .then(x => {
        /* формируем объекты с данными о этаже, комнатах и столах */
        let buildingData = {
            hoverEnabled: false,
            dataSource: { features: x.data.floor },
            name: "building"
        };

        let roomsData = {
            color: "#fff",
            borderColor: "#123424",
            borderWidth: 1,
            label: {
                enabled: true,
                dataField: "name"
            },
            dataSource: { features: x.data.rooms },
            name: "rooms"
        }

        let desksData = {
            type: "marker",
            elementType: "image",
            dataField: "url",
            size: config.iconSize,
            dataSource: { features: x.data.desks },
            name: "desks"
        }

        /* подгрузка карты */
        $scope.vectorMapOptions = {
            controlBar: {
                enabled: false
            },
            maxZoomFactor: 10,
            projection: {
                to: (coordinates) => [coordinates[0] / 100, coordinates[1] / 100],
                from: (coordinates) => [coordinates[0] * 100, coordinates[1] * 100]
            },
            layers: [
                buildingData,
                roomsData,
                desksData
            ],
            loadingIndicator: {
                show: true
            },
            /* вывод popUp при наведении выши на стол */
            tooltip: {
                enabled: true,
                contentTemplate: (e, container) => {
                    if(e.layer.name === "desks") {
                        let popUp = document.createElement('div');
                        popUp.className = 'popUp';

                        let avatar = document.createElement('img');
                        avatar.className = 'avatar';
                        avatar.src = `/images/users/${e.attribute('avatar')}`;

                        let name = document.createElement('p');
                        name.innerText = e.attribute('user');

                        let post = document.createElement('span');
                        post.className = 'post';
                        post.innerText = e.attribute('post');

                        let status = document.createElement('span');
                        status.className = 'status';
                        status.innerText = e.attribute('status');

                        name.prepend(post);
                        name.append(status);
                        popUp.append(avatar);
                        popUp.append(name);
                        container.append(popUp);
                    }
                }
            },
            onZoomFactorChanged: function (e) {
                
                desksData.size = config.iconSize * e.zoomFactor;
                e.component.getLayerByName('desks').getElements().forEach((x, i, arr) => {
                    x.applySettings(desksData);
                });
                e.component.render();
            }
        };
    });
});