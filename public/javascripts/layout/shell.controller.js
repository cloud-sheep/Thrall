(function () {
	'use strict';

	angular.module('app').controller('shellCtrl', shellCtrl);

	shellCtrl.$inject = ['$scope', 'common']

	function shellCtrl($scope, common) {
		var vm = $scope;

		activate();

		function activate() {
			common.$subscribe(common.auth.events.authStatusChange, function (event, args) {
				if (args.isAuth)
					common.$location.path('/index');
				else
					common.$location.path('/sign-in');
			});
		}


	}

})();