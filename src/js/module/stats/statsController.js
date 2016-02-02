angular.module("gerritDashboard.stats").controller("statsController",
    [
        "$scope", "requestService",
        function ($scope, requestService) {
            "use strict";

            requestService.makeRequest("/stats", function (response) {
                $scope.stats = response;
            });

            $scope.getStats = function (filter) {
                var reqEndPoint = "/stats?filter=" + filter;

                requestService.makeRequest(reqEndPoint, function (response) {
                    $scope.stats = response;
                })
            };
        }
    ]
);