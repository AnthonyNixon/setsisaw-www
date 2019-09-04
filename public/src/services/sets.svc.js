'use strict';

angular
    .module('setsisaw')
    .factory('SetsService', Service);

function Service($http, $rootScope) {
    var service = {};

    service.GetUserSets = GetUserSets;

    return service;

    function GetUserSets(callback) {
        $http.get('https://api.setsisaw.com/sets', {
            headers: {'Authorization': 'Bearer ' + $rootScope.globals.token}
        })
            .then(function (response) {
                // login successful if there's a token in the respon
                console.log("Response", response);
                if (response.status === 200) {
                    console.log(response.data);
                    // execute callback with true to indicate successful login
                    callback(response.data.sets);
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
