var sourceList = [
    "app/**/*.js",
    "module/common/i18n/module.js",
    "module/common/**/*.js",
    "module/dashboard/module.js",
    "module/dashboard/dashboardController.js",
    "module/stats/*.js",
    "module/footer/module.js",
    "module/footer/footerController.js",
    "module/header/module.js",
    "module/header/*.js"
];

var basePath = "src/js/";
var sourceListLength = sourceList.length;

for (var fileIndex = 0; fileIndex < sourceListLength; fileIndex++) {
    sourceList[fileIndex] = basePath + sourceList[fileIndex];
}

module.exports = sourceList;
