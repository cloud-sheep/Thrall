(function () {
	'use strict';

    var app = angular.module('app');

    app.constant('routes', getRoutes());

    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {
        for (var i in routes)
            $routeProvider.when(routes[i].url, routes[i].config);

        $routeProvider.otherwise({ redirectTo: '/404' });
    }

	function getRoutes() {
		return [
			{
				url: '/',
				config: {
					templateUrl: 'javascripts/home/index.html',
					controller: "indexCtrl",
					title: 'Home'
				}
			},
			{
				url: '/sign-in',
				config: {
					templateUrl: 'javascripts/sign-in/sign-in.html',
					controller: "signInCtrl",
					title: 'Sign In'
				}
			},
			{
				url: '/sign-up',
				config: {
					templateUrl: 'javascripts/sign-up/sign-up.html',
					controller: "signUpCtrl",
					title: 'Sign Up'
				}
			}
		];
	}
})();