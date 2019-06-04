'use strict';

angular
    .module('setsisaw')
    .factory('AuthenticationService', Service);

function Service($http) {
    var service = {};

    service.Login = Login;

    return service;

    function Login(username, password, callback) {
        $http.post('https://api.setsisaw.com/signin', { username: username, password: password })
            .then(function (response) {
                // login successful if there's a token in the respon
                console.log("Response", response);
                if (response.data.token) {
                    console.log(response.data.token);
                    // store username and token in local storage to keep user logged in between page refreshes
                    // $localStorage.currentUser = { username: username, token: response.token };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

                    // execute callback with true to indicate successful login
                    callback(response.data.token);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    }

    // function Logout() {
    //     // remove user from local storage and clear http auth header
    //     delete $localStorage.currentUser;
    //     $http.defaults.headers.common.Authorization = '';
    // }
}