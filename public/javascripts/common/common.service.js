(function () {
	'use strict';

	angular.module('common').factory('common', common)

	common.$inject = ['$rootScope', '$timeout', '$location', '$q', '$window', '$log', '$http', 'authSvc'];

	function common($rootScope, $timeout, $location, $q, $window, $log, $http, authSvc) {

		var svc = {
			$rootScope: $rootScope,
            $timeout: $timeout,
            $location: $location,
            $q: $q,
            $window: $window,
			$log: $log,
			$http: $http,
			
			auth: authSvc,

			$broadcast: $broadcast,
			$subscribe: $subscribe
		};

		return svc;

		function $broadcast(event, arg) {
            $rootScope.$broadcast(event, arg);
        }

        function $subscribe(event, listener) {
            $rootScope.$on(event, listener);
        }
	}

})();