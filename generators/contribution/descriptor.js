var helper = require('../../lib/helpers.js');

module.exports = {
  params: [{
    type: 'input',
    name: 'package',
    message: 'Contribution package:',
    store: true,
    validate: helper.validators.package,
    filter: function (answer) {
      return answer.replace(/\s+/g, '.');
    }
  }, {
    type: 'input',
    name: 'contribution_name',
    message: 'Contribution name:',
    validate: helper.validators.only_chars
  }, {
    type: 'input',
    name: 'target',
    message: 'Target Component:',
    validate: helper.validators.package
  }, {
    type: 'input',
    name: 'point',
    message: 'Extension Point:',
    validate: helper.validators.only_chars
  }],
  contributions: [{
    src: 'empty.xml',
    dest: '{{s.dasherize(s.decapitalize(s.titleize(contribution_name)))}}-contrib.xml'
  }]
};
