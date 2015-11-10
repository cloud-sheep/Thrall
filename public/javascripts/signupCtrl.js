app.controller('signupCtrl', ['$scope', '$http', function ($scope, $http) {
   $scope.email = '';
   $scope.password = '';
   $scope.btDisabled = false;

   $scope.send = function () {
      if($scope.email === '')
         return alert('Invalid email!');
      if($scope.password === '')
         return alert('Invalid password!');

      $http.post('/user/save', {
         email: $scope.email, 
         password: $scope.password 
      }).then(function (result) {
         $scope.btDisabled = false;
         if(result.data.error)
            return alert('Error: ' + result.data.error);
         
         $scope.$emit('signoutEvent', { token: result.data.token });
         window.location.assign("/");

      }, function (error) {
         $scope.btDisabled = false;
         alert('Unknown error!');
      });
   };
}]);