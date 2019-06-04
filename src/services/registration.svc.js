'use strict';

angular
    .module('setsisaw')
    .factory('RegistrationService', Service);

function Service($http) {
    var service = {};

    service.Register = Register;

    return service;

    function Register(username, email, password, firstname, lastname, callback) {
        $http.post('https://api.setsisaw.com/signup', {
            username: username,
            email: email,
            password: password,
            first_name: firstname,
            last_name: lastname
        })
            .then(function (response) {
                // login successful if there's a token in the respon
                console.log("Response", response);
                if (response.status === 201) {
                    console.log(response.data);
                    // store username and token in local storage to keep user logged in between page refreshes
                    // $localStorage.currentUser = { username: username, token: response.token };

                    // add jwt token to auth header for all requests made by the $http service
                    // $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(response.data);
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