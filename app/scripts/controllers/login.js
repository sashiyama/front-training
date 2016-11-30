'use strict';

/**
 * @ngdoc function
 * @name frontTrainingApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontTrainingApp
 */
angular.module('frontTrainingApp')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.transformRequest.push(
      function(data) {
        var requestStr;
        if (data) {
          data = JSON.parse(data);
          for (var key in data) {
            if (requestStr) {
              requestStr += '&' + key + '=' + data[key];
            } else {
              requestStr = key + '=' + data[key];
            }
          }
        }
        return requestStr;
      });
    $httpProvider.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  }])

  .controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.onclick = function() {
      console.log($scope.login_id);
      console.log($scope.password);
      $http({
        method: 'POST',
        url: 'http://front_kensyu.awsdev.ha-mo.jp/app/auth/login/',
        data: {
          login_id: $scope.login_id,
          password: $scope.password
        }
      })
        .success(function(data, status, headers, config){
          $scope.result = data;
          $scope.login_id = "";
          $scope.password = "";
        })
        .error(function(data, status, headers, config){
          $scope.result = 'error';
        });
    };
  }]);
