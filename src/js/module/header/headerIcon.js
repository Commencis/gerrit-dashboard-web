angular.module("gerritDashboard.header").directive("languageIcon",
    ["i18n", "supportedLanguages",
        function (i18n, supportedLanguages) {
            "use strict";

            return {
                restrict: "E",
                replace: true,
                templateUrl: "./template/header/languageIcon.html",
                link: function (scope) {
                    var currentLanguage = i18n.getLanguage();

                    scope.languageText = currentLanguage === supportedLanguages.EN ? "TR" : "EN";
                    scope.updateLanguage = function () {
                        if (currentLanguage === supportedLanguages.EN) {
                            i18n.changeLanguage(supportedLanguages.TR);
                            scope.languageText = "EN";
                        } else {
                            i18n.changeLanguage(supportedLanguages.EN);
                            scope.languageText = "TR";
                        }
                    }

                }
            }
        }
    ]);