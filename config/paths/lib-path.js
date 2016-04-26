libList = [
    "jquery/dist/jquery.js",
    "angular/angular.js",
    "angular-ui-router/release/angular-ui-router.js",
    "bootstrap/dist/js/bootstrap.js",
    "angular-bootstrap/ui-bootstrap-tpls.js"
];

var basePath = "lib/";
var libListLength = libList.length;

for (var fileIndex = 0; fileIndex < libListLength; fileIndex++) {
    libList[fileIndex] = basePath + libList[fileIndex];
}

module.exports = libList;

