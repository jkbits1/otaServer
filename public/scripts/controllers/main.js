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

    //$scope.searchTerm = "europe%20debate";
    $scope.searchTerm = "europe debate";

    $scope.articleDescriptions = [];

    //$http.get('' + progIdUriSegment)
    $http.get('/mainArticle')
      .success(function (data, status, headers, config) {

        var max = 5;
        var current = 0;

        //var parsed = JSON.parse(data);

        //parsed.forEach(function (val) {
        data.forEach(function (val) {
          console.log(val);

          if (current < max) {
            $scope.articleDescriptions.push(val.description);
            current++;
          }
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

    $scope.searchJuicer = function () {

      var encodedSearchTerm = encodeURIComponent($scope.searchTerm);

      $http.get('/mainArticleSearch/' + encodedSearchTerm)
        .success(function (data, status, headers, config) {

          var max = 5;
          var current = 0;

          //var listDiv = document.getElementById("topFive");
          //listDiv.innerHTML = "";

          $scope.articleDescriptions = [];

          //var parsed = JSON.parse(data);

          //parsed.forEach(function (val) {
          data.forEach(function (val) {
            console.log(val);

            if (current < max) {
              $scope.articleDescriptions.push(val.description);
              current++;
            }
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

    };

  }]);
