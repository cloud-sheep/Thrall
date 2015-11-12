(function () {
    'use strict';

    angular.module('common').factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', 'localStorageService'];

    function authInterceptor($rootScope, $q, $location, localStorageService) {

        var STORAGE_KEY = 'app-auth-data';

        function request(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get(STORAGE_KEY);
            if (authData) {
               config.headers.Authorization = authData.token;
            }
                       
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                localStorageService.remove(STORAGE_KEY);

                $rootScope.$broadcast("auth.statusChange", false);

                $location.path("/login");
            }
            return $q.reject(rejection);
        }

        var service = {
            request: request,
            responseError: responseError
        };

        return service;
    }
})();