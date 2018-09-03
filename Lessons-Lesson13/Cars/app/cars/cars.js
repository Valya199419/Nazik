'use strict';

angular.module('myApp.cars', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cars', {
    templateUrl: 'cars/cars.html',
    controller: 'CarsCtrl'
  })

}])

.controller('CarsCtrl', ['$scope','$http',function($scope,$http) {

    $http.get("http://localhost:8081/api/car_list")
        .then(function(response) {
            $scope.todos = response.data;

            $scope.carOnPage = 5; // էջիս երևացող մեքենաների քանակը
            $scope.startFrom = 0; //  ցույց տալ սկսած startFrom-րդ անդամից
            $scope.CountPageDivs = [];
            for(var i=1; i <= Math.ceil($scope.todos.length/5); i++) {
                $scope.CountPageDivs.push(i);
            }
            $scope.PaginationFunction = function(event){
                $scope.turId = event.target.id;
                console.log(event)
               $scope.startFrom= ($scope.turId-1)*$scope.carOnPage;
                };

        });
}]);