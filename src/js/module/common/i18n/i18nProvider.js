angular.module("gerritDashboard.i18n").provider("i18n", [function () {
    "use strict";

    var transMap = {};
    var language;
    var LANG_STORAGE_KEY = "dashboardLang";

    var persistenceConfig = {
        saveLanguage: function (lang, window) {
            try {
                window.localStorage.setItem(LANG_STORAGE_KEY, lang);
            } catch (e) {
                window.sessionStorage.setItem(LANG_STORAGE_KEY, lang);
            }
        }
    };

    function setLanguage (lang) {
        language = lang;
    }

    function getLanguage () {
        return language;
    }

    function getLanguageStorageKey () {
        return LANG_STORAGE_KEY;
    }

    return {
        translations: transMap,
        setLanguage: setLanguage,
        getLanguage: getLanguage,
        getLanguageStorageKey: getLanguageStorageKey,
        persistenceConfig: persistenceConfig,
        $get: ["$window", function ($window) {
            return {
                translate: function (key, params) {
                    var translatedStr = transMap[language][key] || key;

                    if (params) {
                        var parametersLength = params.length;

                        for (var paramIndex = 0; paramIndex < parametersLength; paramIndex++) {
                            var param = params[paramIndex];
                            translatedStr = translatedStr.replace("{" + paramIndex + "}", param);
                        }
                    }

                    return translatedStr;
                },
                changeLanguage: function (lang) {
                    persistenceConfig.saveLanguage(lang, $window);
                    setLanguage(lang);
                    $window.location.reload();
                },
                getLanguage: getLanguage
            }
        }]
    }

}]);

angular.module("gerritDashboard").config(
    ["i18nProvider", "$windowProvider", "supportedLanguages",
        function (i18n, $windowProvider, supportedLanguages) {
            var $window = $windowProvider.$get();
            var lang = $window.localStorage.getItem(i18n.getLanguageStorageKey()) || supportedLanguages.EN;
            i18n.setLanguage(lang);
        }
    ]);