angular.module("gerritDashboard.stats").service("statsUtil",
    [
        function () {
            "use strict";

            function isInMap(map, key) {
                return Object.keys(map).indexOf(key) > -1;
            };

            this.populateAdditionalMetricsForProjects = function(projects, avgMergeTimeList, avgFirstReviewTimeList) {
                var avgMergeTimeProjectMap = {};
                var avgFirstReviewProjectMap = {};

                avgMergeTimeList.forEach(function(project) {
                    avgMergeTimeProjectMap[project.Project] = project.AvgMergeDuration.toFixed(2);
                });

                avgFirstReviewTimeList.forEach(function(project) {
                    avgFirstReviewProjectMap[project.Project] = project.AvgFirstReviewDuration.toFixed(2);
                });

                projects.forEach(function(project) {
                    if (isInMap(avgMergeTimeProjectMap, project.name)) {
                        project.avgMergeTime = avgMergeTimeProjectMap[project.name];
                    }

                    if (isInMap(avgFirstReviewProjectMap, project.name)) {
                        project.avgFirstReviewTime = avgFirstReviewProjectMap[project.name];
                    }
                });
            };

            this.getFilterString = function(filter) {
                var filterStr = "today";

                if (filter === "THIS_WEEK") {
                    filterStr = "this week";
                } else if (filter === "THIS_MONTH") {
                    filterStr = "this month";
                } else if (filter === "LAST_30_DAYS") {
                    filterStr = "the last 30 days";
                } else if (filter === "LAST_6_MONTHS") {
                    filterStr = "the last 6 months";
                }

                return filterStr;
            }
        }
    ]
);
