var findAlums = angular.module('findAlums', []);

findAlums.controller('mainController', ($scope, $http) => {
  $http.get('/alums')
    .then((res) => {
      $scope.data = res.data;
      console.log(`Data is ${$scope.data}`);
    }).catch((data) => {
      console.log(`Error: ${data}`);
    });
});