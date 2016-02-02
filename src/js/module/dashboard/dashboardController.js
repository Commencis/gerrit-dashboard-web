angular.module("gerritDashboard.dashboard").controller("dashboardController",
    [
        "$scope", "requestService",
        function ($scope, requestService) {
            "use strict";

            requestService.makeRequest("/dashboard", function (response) {
                $scope.numberOfProjects = response.totalNumberOfProjects;
                $scope.numberOfOpenReview = response.numberOfReviews.open;
                $scope.averageReviewInterval = response.averageReviewInterval + "h";
            })
        }
    ]
);