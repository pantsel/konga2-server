module.exports = {


  friendlyName: 'Get url parameter',


  description: '',


  inputs: {

    url : {
      type: 'string',
      example: 'http://test.com/',
      description: 'The URL'
    },

    param : {
      type: 'string',
      example: 'test',
      description: 'The parameter to get'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Url parameter',
    },

  },


  fn: async function (inputs) {

    if(!inputs.url) return '';
    inputs.param = inputs.param.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + inputs.param + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(inputs.url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));


  }


};

