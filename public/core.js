var findAlums = angular.module('findAlums', []);

findAlums.controller('mainController', ($scope, $http) => {
  let JSONattributes = ['lastName', 'firstName', 'gradYear', 'position', 'company', 'committee', 'boardPosition', 'dukeEmail', 'email', 'linkedin'];
  // this is a $scope object for table header
  $scope.humanAttributes = ['Last Name', 'First Name', 'Graduation Year', 'Current Position', 'Current Company',
                            'Committee(s)', 'Board Positions', 'Duke Email', 'Non-Duke Email', 'LinkedIn'];

  // create attributes array which maps machine name to human name
  $scope.attributes = JSONattributes.map((element, index) => {
    return {
      value: element,
      humanName: $scope.humanAttributes[index]
    }
  });

  $http.get('/alums')
    .then((res) => {
      let rawData = res.data;
      console.log('RAW DATA:', rawData);
      console.log('RES:', res);
      // transform data into objects for sorting
      $scope.data = []; // will be array of person objects
      rawData.forEach((person) => {
        var personObject = {};
        person.forEach((attribute, index) => {
          let attrName = $scope.attributes[index].value;
          personObject[attrName] = attribute;
        });
        $scope.data.push(personObject);
      });
    }).catch((err) => {
      console.log(err);
    });
});