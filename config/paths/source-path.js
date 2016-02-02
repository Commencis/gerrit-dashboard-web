var sourceList = [
    "app/**/*.js",
    "module/common/**/*.js",
    "module/dashboard/module.js",
    "module/dashboard/dashboardController.js",
    "module/stats/module.js",
    "module/stats/statsController.js",
    "module/footer/module.js",
    "module/footer/footerController.js"
];

var basePath = "src/js/";
var sourceListLength = sourceList.length;

for (var fileIndex = 0; fileIndex < sourceListLength; fileIndex++) {
    sourceList[fileIndex] = basePath + sourceList[fileIndex];
}

module.exports = sourceList;
