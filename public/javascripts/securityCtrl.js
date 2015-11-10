app.controller('securityCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.token = window.localStorage.getItem('token') || '';

  var signin = function (data) {
    window.localStorage.setItem('token', data.token);
    $scope.token = data.token;
  };

  var signout = function () {
    window.localStorage.removeItem('token');
    $scope.token = '';
  };

  // events
  $scope.$on('signinEvent', signin);
  $scope.$on('signoutEvent', signout);
}]);