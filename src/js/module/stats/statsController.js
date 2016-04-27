angular.module("gerritDashboard.stats").controller("statsController",
    [
        "$scope", "requestService", "statsUtil",
        function ($scope, requestService, statsUtil) {
            "use strict";

            requestService.makeRequest("/stats", function (response) {
                statsUtil.populateAdditionalMetricsForProjects(
                    response.mostCommittedProjects,
                    response.avgMergeTime,
                    response.avgFirstReviewTime
                );

                $scope.filter = statsUtil.getFilterString();
                $scope.stats = response;
            });

            $scope.getStats = function (filter) {
                var reqEndPoint = "/stats?filter=" + filter;

                requestService.makeRequest(reqEndPoint, function (response) {
                    statsUtil.populateAdditionalMetricsForProjects(
                        response.mostCommittedProjects,
                        response.avgMergeTime,
                        response.avgFirstReviewTime
                    );

                    $scope.filter = statsUtil.getFilterString(filter);
                    $scope.stats = response;
                })
            };

            $scope.reviewerPopup = {
                templateUrl: "template/stats/reviewer-popup.html"
            };

            $scope.projectsPopup = {
                templateUrl: "template/stats/projects-popup.html"
            };
        }
    ]
);
