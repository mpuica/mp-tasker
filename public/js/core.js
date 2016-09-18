// public/js/core.js
(function(angular){
    'use strict';

    var mpTasker = angular.module('mpTasker', []);

    mpTasker.controller('mpController',function ($scope, $http) {
        $scope.formData = {};

        // get all tasks
        $http.get('/api/tasks')
            .success(function(data) {
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // on submit send the text to the API
        $scope.createTask = function() {
            $http.post('/api/tasks', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form
                    $scope.tasks = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a task on check
        $scope.deleteTask = function(id) {
            $http.delete('/api/tasks/' + id)
                .success(function(data) {
                    $scope.tasks = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

    });

})(window.angular);
