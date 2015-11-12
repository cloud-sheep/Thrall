(function () {
	'use strict';

	angular.module('app').controller('signInCtrl', signInCtrl);

	signInCtrl.$inject = ['$scope', 'common'];

	function signInCtrl($scope, common) {
		var vm = $scope;

		vm.signIn = signIn;
		
		activate();

		function activate() {
			vm.email = '';
			vm.password = '';
		}

		function signIn() {
			if (vm.email === '')
				return alert('Invalid email!');
			if (vm.password === '')
				return alert('Invalid password!');
				
			common.auth
				.signIn(vm.email, vm.password)
				.then(function (result) {
					common.$window.alert("Login Successfuly!");
				}, function (err) {
					common.$log.error(err);					
					common.$window.alert(err.data.error);
				});
		}


	}

})();