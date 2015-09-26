'use strict';

/**
 * @ngdoc function
 * @name otaClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the otaClientApp
 */
angular.module('otaClientApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //$http.get('' + progIdUriSegment)
    $http.get('/mainArticle')
      .success(function (data, status, headers, config) {

        //var parsed = JSON.parse(data);

        //parsed.forEach(function (val) {
        data.forEach(function (val) {
          console.log(val);
        });

        //$scope.blather2 = data.files;
        //$scope.blather2 = data;
        //$scope.blather2 = parsed;
        $scope.blather2 = data[0];

        //var monthYears = [];


        //var parser = new fileParser($scope.files[0].fileName);

        //$scope.fileName = $scope.getProgramName();
        //$scope.summary = $scope.getProgrammeSummary();

      }).error(function(data, status, headers, config) {

      });

    $scope.blather = "test123";

  }]);
