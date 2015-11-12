(function () {

    'use strict';

    angular.module('common').factory('preloaderInterceptor', preloaderInterceptor);

    preloaderInterceptor.$inject = ['$q'];

    function preloaderInterceptor($q) {
        var numRequest = 0;

        function queueRequest() {
            numRequest++;
        }

        function dequeueRequest() {
            numRequest--;
            return numRequest;
        }

        function hide(response) {
            if (!dequeueRequest()) {
                if (NProgress)
                    NProgress.done();
            }
            return response;
        }

        function request(config) {
            queueRequest();
            if (NProgress)
                NProgress.start();
            return config;
        }

        function response(response) {
            return hide(response);
        }

        function responseError(response) {
            return $q.reject(hide(response));
        }

        var service = {
            request: request,
            response: response,
            responseError: responseError
        };

        return service;
    }

})();