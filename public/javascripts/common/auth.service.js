(function () {
        'use strict';

        angular.module('common').factory("authSvc", authSvc);

        authSvc.$inject = ['$http', '$q', '$rootScope', '$window', 'localStorageService'];

        function authSvc($http, $q, $rootScope, $window, localStorageService) {
                var STORAGE_KEY = 'app-auth-data';

                var currentAuthState = {
                        isAuth: false,
                        token: "",
                        userName: ""
                };

                var events = {
                        authStatusChange: "auth.statusChange"
                };

                fillAuthData();

                $rootScope.$on(events.authStatusChange, function (event, args) {
                        if (args)
                                fillAuthData();
                });

                function signIn(email, password) {
                        var dfd = $q.defer();

                        $http.post('/user/signin', {
                                email: email,
                                password: password
                        }).then(function (result) {

                                if (result.data.error) {
                                        dfd.reject('Error: ' + result.data.error);
                                        return;
                                }

                                currentAuthState.isAuth = true;
                                currentAuthState.token = result.data.token;
                                currentAuthState.userName = result.data.userName;
                                
                                localStorageService.set(STORAGE_KEY, currentAuthState);

                                rise(events.authStatusChange, currentAuthState);

                        }, function (error) {
                                dfd.reject(error);
                                resetAuthState();
                        });

                        return dfd.promise;
                }

                function signOut() {
                        var dfd = $q.defer();
                        $http.post('/user/signout')
                        .then(function (result) {
                                if (result && result.data && result.data.error){
                                        dfd.reject('Error: ' + result.data.error);
                                        return;       
                                }
                                
                                resetAuthState();
                                
                                rise(events.authStatusChange, currentAuthState);
                                
                        }, function (error) {
                                dfd.reject(error);
                        });
                        return dfd.promise;
                }

                function rise(evt, args) {
                        $rootScope.$broadcast(evt, args);
                }

                function resetAuthState() {
                        currentAuthState.isAuth = false;
                        currentAuthState.token = null;
                        currentAuthState.userName = "";
                }

                function fillAuthData() {
                        var authData = localStorageService.get(STORAGE_KEY);

                        if (authData) {
                                currentAuthState.isAuth = true;
                                currentAuthState.token = authData.token;
                                currentAuthState.userName = authData.userName;
                        } else
                                resetAuthState();
                }
                
                function setState(isAuth, token, userName){
                        currentAuthState.isAuth = isAuth;
                        currentAuthState.token = token;
                        currentAuthState.userName = userName;
                        
                        localStorageService.set(STORAGE_KEY, currentAuthState);
                        
                        rise(events.authStatusChange, currentAuthState);                                                
                }

                return {
                        signIn: signIn,
                        signOut: signOut,
                        events: events,
                        setState: setState
                };
        }

})();