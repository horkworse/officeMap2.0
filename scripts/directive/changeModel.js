'use strict';

MapApp.directive("fileread", ['$http', '$route' , function ($http, $route) {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                let user = JSON.parse(localStorage.user);

                let formData = new FormData();
                formData.append('file', changeEvent.target.files[0]);
                formData.append('id', user['id']);

            	$http({
            		url: "/includes/dataGetter.php",
            		method: "post",
            		data: formData,
            		headers: {'Content-Type': undefined}
            	})
            	.then((x) => {
                    user.image = x.data;
                    localStorage.user = JSON.stringify(user);
                    $route.reload();
                });
            });
        },
        restrict: "EACM"
    }
}]);