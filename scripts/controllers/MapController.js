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

    searchField();

    /* храним данные о юзере */
    $scope.user = JSON.parse(localStorage.getItem('user'));

    /* выход юзера из учетки*/
    $scope.logout = function () {
        $http.post('/includes/dataGetter.php', {logout: true});
        localStorage.removeItem('user');
        $scope.user = null;
        $location.path('/sign-in');
    };
    
    /*$scope.search = function () {
        $http.post('/includes/dataGetter.php', {
            search: true,
            data: { key: document.getElementById('search__input').value }
        })
        .then(x => {
            let resultList = document.getElementsByClassName('list')[0];
            resultList.innerHTML = "";

            x.data.forEach(employee => {
                let item = document.createElement("li");
                let name = document.createElement("span");
                let post = document.createElement("span");
                let status = document.createElement("span");

                name.innerText = employee.surname + " " + employee.name + " ";
                post.innerText = employee.post + " ";
                status.innerText = employee.status
                
                item.append(name, post, status);

                item.addEventListener("click", function(e) {
                    let desks = desksData.dataSource.features;

                    for (var i = 0; i < desks.length; i++) {
                        if (desks[i].properties.id == employee.id) {
                            console.log(desks[i].properties.name);
                        }
                    }
                    

                    console.log(employee);

                });
                resultList.append(item);

                // resultList.insertAdjacentHTML('beforeend', "<li><a href='#'> <font color='red'>" 
                // + employee.surname + " " + employee.name + "</font> - <font color='green'>" 
                // + employee.post   + "</font> - <font color='violet'>" + employee.status +"</font></a></li>");
            });
        });
    };*/
    
    $scope.statuses = [
        { name: "Не беспокоить", value: "0" },
        { name: "Отошел", value: "1" },
        { name: "Работает", value: "2" },
        { name: "Не работает", value: "3" }
    ];

    $scope.status = $scope.statuses.find(item => item.name == $scope.user.status);
    /* пока пусть будет так, потом оптимизирую и сделаю так, как вы планировали */
    
    if($scope.status.name == 'Не работает')
    {
        document.getElementById('stat').setAttribute("class", "fas fa-wine-bottle");
        document.getElementById('stat').style.color = '#19FF4F';
    }
    else if ($scope.status.name == 'Не беспокоить')
    {
        document.getElementById('stat').setAttribute("class", "fas fa-fire");
        document.getElementById('stat').style.color = '#FF0D22';
    }
    else if ($scope.status.name == 'Отошел')
    {
        document.getElementById('stat').setAttribute("class", "fas fa-door-open");
        document.getElementById('stat').style.color = '#0122FF';
    }
    else
    {
        document.getElementById('stat').setAttribute("class", "fas fa-briefcase");
        document.getElementById('stat').style.color = '#FFC400';
    }
    
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
            if (item.id != 'email')
            {
                item.toggleAttribute('readonly');
                item.style.cursor = (item.style.cursor == 'text') ? '' : 'text';
                item.style.animation  = item.style.borderBottom  == '' ? `sideBarLinksBorder 0.2s ease` : `sideBarLinksUnBorder 0.2s ease` ;
                item.style.borderBottom  = item.style.borderBottom  == '' ? '2px solid rgba(0,0,0,.5)' : '';
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

        let map = $("#vector-map").dxVectorMap("instance");

        $scope.search = function () {
            $http.post('/includes/dataGetter.php', {
                search: true,
                data: { key: document.getElementById('search__input').value }
            })
            .then(x => {
                let resultList = document.getElementsByClassName('list')[0];
                resultList.innerHTML = "";

                x.data.forEach(employee => {
                    let item = document.createElement("li");
                    let name = document.createElement("span");
                    let post = document.createElement("span");
                    let status = document.createElement("span");

                    name.innerText = employee.surname + " " + employee.name + " ";
                    post.innerText = employee.post + " ";
                    status.innerText = employee.status
                    
                    item.append(name, post, status);

                    item.addEventListener("click", function(e) {
                        let desks = desksData.dataSource.features;

                        for (let i = 0; i < desks.length; i++) {
                            if (desks[i].properties.id == employee.id) {
                                
                                let prevImagePath = desks[i].properties.url;
                                desks[i].properties.url = '/images/selected.png';

                                map.center(desks[i].geometry.coordinates);
                                map.zoomFactor(4);
                                map.option("layers[2].dataSource", desksData.dataSource);
                                map.render();

                                setTimeout(() => {
                                    desks[i].properties.url = prevImagePath;
                                    map.option("layers[2].dataSource", desksData.dataSource);
                                    map.render();
                                }, 3000)
                                break;
                            }
                        }
                    });
                    resultList.append(item);

                    // resultList.insertAdjacentHTML('beforeend', "<li><a href='#'> <font color='red'>" 
                    // + employee.surname + " " + employee.name + "</font> - <font color='green'>" 
                    // + employee.post   + "</font> - <font color='violet'>" + employee.status +"</font></a></li>");
                });
            });
        };

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

                    if ($scope.isDraggable ) {
                        // let map = $("#vector-map").dxVectorMap("instance");
                        let currentDesk = desksData.dataSource.features[$scope.targetId];

                        currentDesk.geometry.coordinates = $scope.coordinates;                        
                        map.option("layers[2].dataSource", desksData.dataSource);
                        map.render();
                    }

                    if (e.layer.name === "desks" && !$scope.isDraggable) {
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

                        let status = document.createElement('p');
                        status.className = 'status';
                        status.innerText = e.attribute('status');

                        switch (status.innerText) {
                            case 'Не работает':
                                status.style.color = '#19FF4F';
                                break;
                            case 'Не беспокоить':
                                status.style.color = '#FF0D22';
                                break;
                            case 'Отошел':
                                status.style.color = '#0122FF';
                                break;
                            default:
                                status.style.color = '#FFC400';
                                break;
                        }

                        name.prepend(post);
                        name.append(status);
                        popUp.append(avatar);
                        popUp.append(name);
                        container.append(popUp);
                    }
                }
            },
            onZoomFactorChanged: (e) => {
                // let map = e.component;
                desksData.size = config.iconSize * e.zoomFactor;
                map.getLayerByName('desks').getElements().forEach((x, i, arr) => {
                    x.applySettings(desksData);
                });
                map.render();
            },
            onDrawn: (e) => {
                e.element.on('mousemove', function(event) {
                    // let map = $("#vector-map").dxVectorMap("instance");
                    let render = false;
                    $scope.coordinates = map.convertToGeo(event.clientX, event.clientY );
                })
            },
            onClick: (e) => {

                if (e.target !== undefined && e.target.layer.name == 'desks') {
                    // let map = e.component;
                    let id = e.target.index;
                    let currentDesk = desksData.dataSource.features[id];

                    if ($scope.isDraggable) {
                        $scope.isDraggable = false;
                        console.log("moving is end");
                    }
                    else {
                        $scope.isDraggable = true;
                        console.log("moving is start");
                    }
                    $scope.targetId = id;

                    // currentDesk.geometry.coordinates[0] = +currentDesk.geometry.coordinates[0] + 10;

                    map.option("layers[2].dataSource", desksData.dataSource);
                    map.render();
                }
            }
        };
    });
});
