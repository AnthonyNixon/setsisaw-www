// if (location.protocol !== 'https:')
// {
//     location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }

'use strict';

angular
    .module('setsisaw', ['ngRoute', 'ngCookies', 'ngMaterial'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'src/home/home.view.html'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'src/login/login.view.html'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'src/register/register.view.html',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);
}

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;
        var token = $rootScope.globals.token;
        if (restrictedPage && !token) {
            $location.path('/login');
        }
    });
}