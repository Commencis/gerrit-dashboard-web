angular.module("gerritDashboard").service("requestService",
    [
        "$http", "apiHost",
        function ($http, apiHost) {
            "use strict";

            this.makeRequest = function (path, successCallback, failCallback) {
                failCallback = failCallback || this.defaultFailFunction;

                var url = apiHost + path;

                $http.get(url)
                    .success(successCallback)
                    .error(failCallback)
            };

            this.defaultFailFunction = function (msg) {
                alert(msg);
            }
        }
    ]
);
