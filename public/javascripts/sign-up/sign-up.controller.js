(function () {
	'use strict';

	angular.module('app').controller('signUpCtrl', signUpCtrl);

	signUpCtrl.$inject = ['$scope', 'common', 'sigUpSvc'];

	function signUpCtrl($scope, common, sigUpSvc) {
		var vm = $scope;

		vm.signUp = signUp;

		activate();

		function activate() {
			vm.userName = '';
			vm.email = '';
			vm.password = '';
			vm.confirmPassword = '';
			vm.loading = false;
		}

		function signUp() {

			if (vm.email === '')
				return alert('Invalid email!');
			if (vm.password === '')
				return alert('Invalid password!');
			if (vm.userName === '')
				return alert('Invalid user name!');
			if (vm.confirmPassword !== vm.password)
				return alert('Password and Confirmation password does not match!');

			vm.loading = true;
			sigUpSvc.signUp({
				email: vm.email,
				userName: vm.userName,
				password: vm.password,
				confirmPassword: vm.confirmPassword
			}).then(function (result) {
				vm.loading = false;
				if (result && result.data && result.data.error)
					return alert('Error: ' + result.data.error);

				common.auth.setState(true, result.data.token, vm.userName);
			}, function (err) {
				common.$log.error(err);
				common.$window.alert(err.data.error);
			});
		}


	}

})();