var xmlConverter = require('xml-js');
var peptideSpectrumMatch = require('peptide-spectrum-match');

const PROTON = 1.007276466812;

module.exports.parse = function(fileText, decoyTag=undefined) {
  let psmList = [];

  var xmlDoc = xmlConverter.xml2json(fileText, {compact: true, spaces: 2});
  var xmlObj = JSON.parse(xmlDoc);
  var idObjList = xmlObj.msms_pipeline_analysis.msms_run_summary.spectrum_query;

  psmList = idObjList
    .map(function(idObj) {
      console.log(idObj._attributes);
      console.log(idObj.search_result);
      return '';
      //return extractInfo(idObj, filename, decoyTag);
    }
  );

  return psmList;
};

extractInfo = () => {
  

  let psm = {
    'sequence': '',
    'sequence_pre': '',
    'sequence_post': '',
    'missed_cleavages': 0,
    'protein': '',
    'charge': 0,
    'retention_time': 0,
    'precursor_mass': 0,
    'mass_err': 0,
    'theoretical_mass': 0,
    'modifications': [],
    'filename': '',
    'scan_title': '',
    'scan_id': '',
    'score': 0,
    'expect': 0,
    'is_decoy': false,
    'rank': 1,
    'search_engine': ''
  };

  var psmObj = new peptideSpectrumMatch(psm);

  return psmObj;
}