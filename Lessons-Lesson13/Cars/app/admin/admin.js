'use strict';

angular.module('myApp.admin', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        });
    }])

    .controller('AdminCtrl', ['$scope','$http','$location', function($scope,$http, $location) {

        $http.get("http://localhost:8081/api/car_list")
            .then(function(response) {
                $scope.cars = response.data;
            });

                $scope.create = function(){
                var data = {
                condition: $scope.car.condition,
                body: $scope.car.body,
                year: $scope.car.year,
                make: $scope.car.make,
                model: $scope.car.model,
                transmission: $scope.car.transmission,}

                $http.post('http://127.0.0.1:8081/create_car', data) .then(function(httpRequest) {
                console.log('httprequest is '+httpRequest);
                });
                function timeoutFunction() {
                setTimeout(function(){location.reload(); }, 2000);};
                timeoutFunction();
                };



            $scope.editUser =  function (id) {
                 //$scope.showme=false;
                //console.log(id);
                $scope.update =  function () {   //console.log("Updatei meji id  "+id);
                var dataUpdate = {
                         _id:id,
                         condition:$scope.car.condition,
                         body: $scope.car.body,
                         year: $scope.car.year,
                         make: $scope.car.make,
                         model: $scope.car.model,
                         transmission: $scope.car.transmission,};
                    //console.log("dataUpdate is "+dataUpdate);

                     $http.put('http://127.0.0.1:8081/update_car', dataUpdate) .then(function(Response) {
                         console.log("Response is " + Response);});
            //-------------- Timeout function for update my page  ----------------------//
                     function timeoutFunction() {
                         setTimeout(function(){location.reload(); }, 2000);};
                     timeoutFunction();

                };
            };

        $scope.deleteCar =  function (id) {
                var dataDelete = {_id:id};
               // console.log("dataUpdate is " + dataDelete);

                $http.post('http://127.0.0.1:8081/delete_car', dataDelete) .then(function(Response) {
                    console.log("Response is " + Response);});
                //-------------- Timeout function for update my page  ----------------------//
                /*function timeoutFunction() {
                    setTimeout(function(){location.reload(); }, 2000);};
                timeoutFunction();*/

        };

       // $http.delete('/roles/' + roleid, {params: {userId: userID}}).then.

/*           $scope.deleteCar =  function (id) {
                var deleteId = id;
                console.log("deleteId is  " + deleteId);

                $http.delete('http://127.0.0.1:8081/delete_car', {params: {carId: deleteId}}) .then(function(Response) {
                    console.log("Response is " + Response);});
       //-------------- Timeout function for update my page  ----------------------//
                function timeoutFunction() {
                    setTimeout(function(){location.reload(); }, 2000);};
                timeoutFunction();

        };*/


  }]);



//https://stackoverflow.com/questions/39153424/how-to-pass-a-json-object-to-node-js-server
//https://stackoverflow.com/questions/47706022/error-cannot-find-module-cors