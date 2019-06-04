angular.module('setsisaw').controller('HomeController', function($scope, $rootScope, SetsService) {
    console.log("In the home controller. Hi");
    $scope.loading = true;
    $scope.sets = [];
    SetsService.GetUserSets(function (response) {
        if (response !== false) {
            $scope.loading = false;
            console.log(response);
            $scope.sets = response;
        }
    })
});