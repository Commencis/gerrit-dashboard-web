angular.module("gerritDashboard.footer").controller("footerController",
    [
        "$scope", "requestService",
        function ($scope, requestService) {
            "use strict";

            requestService.makeRequest("/version", function (version) {
                $scope.version = "version " + version.version;
            })
        }
    ]
);
