'use strict';

angular.module('myApp.carOnclick', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/carOnclick', {
            templateUrl: 'carOnclick/carOnclick.html',
            controller: 'CarOnclickCtrl'
        });
    }])
    .controller('CarOnclickCtrl', ['$scope','$http','$location',function($scope,$http,$location) {

                var PageUrl = $location.url();
                //console.log(PageUrl);
                var carId = PageUrl.slice(12);
                var data = {"id" : carId};
        $http.post('http://127.0.0.1:8081/oneCar', data) .then(function(res) {
            //console.log(res.data)

            $scope.oneCar = res.data;

        });
}]);
