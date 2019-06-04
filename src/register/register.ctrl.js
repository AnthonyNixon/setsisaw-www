angular.module('setsisaw').controller('RegisterController', function($scope, RegistrationService, $location, $rootScope) {
    console.log("In the Register controller. Hi");

    $scope.register = function() {
        $scope.loading = true;
        RegistrationService.Register(
            $scope.registerModel.username,
            $scope.registerModel.email,
            $scope.registerModel.password,
            $scope.registerModel.firstname,
            $scope.registerModel.lastname,
            function (result) {
                if (result !== false) {
                    console.log("User created", result);
                } else {
                    console.log("Failed to create user", result)
                }
            }
        );
    };
});