angular.module("gerritDashboard.stats").service("statsUtil",
    [
        function () {
            "use strict";

            var isInMap = function(map, key) {
                return Object.keys(map).indexOf(key) > -1;
            };

            this.populateAdditionalMetricsForProjects = function(projects, avgMergeTimeList, avgFirstReviewTimeList) {
                var avgMergeTimeProjectMap = {};
                var avgFirstReviewProjectMap = {};

                avgMergeTimeList.forEach(function(o, i) {
                    avgMergeTimeProjectMap[o.Project] = o.AvgMergeDuration.toFixed(2);
                });

                avgFirstReviewTimeList.forEach(function(o, i) {
                    avgFirstReviewProjectMap[o.Project] = o.AvgFirstReviewDuration.toFixed(2);
                });

                projects.forEach(function(o, i) {
                    if (isInMap(avgMergeTimeProjectMap, o.name)) {
                        o.avgMergeTime = avgMergeTimeProjectMap[o.name];
                    }

                    if (isInMap(avgFirstReviewProjectMap, o.name)) {
                        o.avgFirstReviewTime = avgFirstReviewProjectMap[o.name];
                    }
                });
            };
        }
    ]
);
