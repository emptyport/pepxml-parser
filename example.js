var fs = require('fs');
var tandem = require('./index');

var filename = "./pepxml_files/test_spectra.pepxml";

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    let psmList = tandem.parse(data);
    //console.log(psmList);
});