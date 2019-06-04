angular.module('setsisaw').controller('LoginController', function($scope, AuthenticationService, $location, $rootScope) {
    console.log("In the login controller. Hi");
    $scope.loginModel = {
        username: '',
        password: ''
    };

    $scope.login = function() {
        $scope.loading = true;
        AuthenticationService.Login($scope.loginModel.username, $scope.loginModel.password, function (result) {
            if (result !== false) {
                console.log("Received token!");
                $rootScope.globals.token = result;
                $location.path('/');
            } else {
                $scope.error = 'Username or password is incorrect';
                $scope.loading = false;
            }
        });
        console.log("Hi.");
    };
});