var app = angular.module('Vizdy', ["ngResource","ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl : "partials/home.html",
            controller  : "HomeCtrl"
        })
        .when('/video/new',{
            templateUrl : "partials/add-video.html",
            controller  : "AddVideoCtrl"
        })
        .when('/video/edit/:id',{
            templateUrl : "partials/add-video.html",
            controller  : "EditVideoCtrl"
        })
        .when('/video/delete/:id',{
            templateUrl : "partials/delete-video.html",
            controller  : "DeleteVideoCtrl"
        })
        .otherwise({
            redirectTo:"/"
        });
}]);

app.controller("HomeCtrl",['$scope','$resource', function ($scope, $resource) {
    var Videos = $resource("/api/videos");
    Videos.query(function (videos) {
        $scope.videos = videos;
    })
}]);

app.controller("AddVideoCtrl",['$scope','$resource','$location', function ($scope, $resource, $location) {
    $scope.save = function () {
        var Videos = $resource('/api/videos');
        Videos.save($scope.video, function () {
            $location.path('/');
        });
    }
}]);

app.controller("EditVideoCtrl",['$scope','$resource','$location','$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Video = $resource('/api/videos/:id',{id:'@_id'},{
            update:{method:"PUT"}
        });

        Video.get({id:$routeParams.id}, function (video) {
            $scope.video = video;
        });

        $scope.save = function () {
            Video.update($scope.video, function () {
                $location.path('/');
            });
        }
}]);

app.controller("DeleteVideoCtrl",['$scope','$resource','$location','$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Video = $resource('/api/videos/:id',{id:"@_id"},{
            delete:{method:"DELETE"}
        });

        Video.get({id:$routeParams.id}, function (video) {
            $scope.video = video;
        });

        $scope.delete = function () {
            Video.delete({id:$routeParams.id}, function (video) {
                $location.path('/');
            })
        }
}]);