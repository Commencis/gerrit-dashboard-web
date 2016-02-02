var libCssList = [
    "bootstrap/dist/css/bootstrap.css",
    "bootstrap/dist/css/bootstrap-theme.css"
];

var basePath = "lib/";

for (var fileIndex = 0; fileIndex < libCssList.length; fileIndex++) {
    libCssList[fileIndex] = basePath + libCssList[fileIndex];
}

module.exports = libCssList;
