angular.module("gerritDashboard.i18n").directive("i18n",
    ["i18n",
        function (i18n) {
            "use strict";

            return {
                restrict: "A",
                link: function (scope, element, attr) {
                    var rawParameter = attr.i18n;
                    var key;

                    if (rawParameter) {
                        var translateParams = null;

                        if ((rawParameter[0] === "{") && (rawParameter[rawParameter.length - 1] === "}")) {
                            var scopeVariableName = rawParameter.substring(1, rawParameter.length - 1);
                            var translateObject = scope[scopeVariableName];

                            if (translateObject) {
                                key = translateObject.key;
                                translateParams = translateObject.params;
                            }
                        } else {
                            key = attr.i18n;
                        }


                        var value = i18n.translate(key, translateParams);
                        element.html(value);
                    }
                }
            }
        }]);