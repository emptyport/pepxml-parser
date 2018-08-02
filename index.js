var xmlConverter = require('xml-js');
var peptideSpectrumMatch = require('peptide-spectrum-match');

const PROTON = 1.007276466812;

module.exports.parse = function(fileText, decoyTag=undefined) {
  let psmList = [];

  var xmlDoc = xmlConverter.xml2json(fileText, {compact: true, spaces: 2});
  var xmlObj = JSON.parse(xmlDoc);
  var idObjList = xmlObj.msms_pipeline_analysis.msms_run_summary.spectrum_query;

  console.log(JSON.stringify(xmlObj));

  psmList = idObjList
    .map(function(idObj) {
      //console.log(idObj._attributes);
      //console.log(idObj.search_result);
      return '';
      //return extractInfo(idObj, filename, decoyTag);
    }
  );

  return psmList;
};

extractInfo = (idObj, filename, decoyTag) => {
  let attributes = idObj._attributes;
  let search_result = idObj.search_result.search_hit._attributes;

  let psm = {
    'sequence': search_result.peptide,
    'sequence_pre': search_result.peptide_prev_aa,
    'sequence_post': search_result.peptide_next_aa,
    'missed_cleavages': 0,
    'protein': search_result.protein,
    'charge': parseInt(attributes.assumed_charge),
    'retention_time': 0,
    'precursor_mass': parseFloat(attributes.precursor_neutral_mass),
    'mass_err': parseFloat(search_result.massdiff),
    'theoretical_mass': parseFloat(search_result.calc_neutral_pep_mass),
    'modifications': [],
    'filename': '',
    'scan_title': attributes.spectrum,
    'scan_id': attributes.start_scan,
    'score': 0,
    'expect': 0,
    'is_decoy': false,
    'rank': parseInt(search_result.hit_rank),
    'search_engine': ''
  };

  var psmObj = new peptideSpectrumMatch(psm);

  return psmObj;
}