module.exports = {


  friendlyName: 'Remove trailing slash',


  description: 'Remove trailing slash from URL',


  inputs: {
    url : {
      type: 'string',
      example: 'http://test.com/',
      description: 'The URL to strip the trailing slash from'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    if(!inputs.url) return inputs.url;

    return inputs.url.replace(/\/$/, "")
  }


};

