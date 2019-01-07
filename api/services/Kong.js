const axios = require('axios');
const JWT = require('./Token');
const ProxyHooks = require('./KongProxyHooks');

const KongService = {

  makeRequestHeaders: function (connection, isJSON) {

    let headers = {};

    if (isJSON) {
      headers = {'Content-Type': 'application/json'}
    }

    // Set required headers according to connection type
    switch (connection.type) {
      case "key_auth":
        headers.apikey = connection.kong_api_key;
        break;
      case "jwt":
        var token = JWT.issueKongConnectionToken(connection);
        headers.Authorization = "Bearer " + token;
        break;
    }

    return headers;
  },

  info: async (connection) => {
    const url = await sails.helpers.removeTrailingSlash(connection.kongAdminUrl);
    const response = await axios({
      method: 'GET',
      headers: KongService.makeRequestHeaders(connection, true),
      url
    });

    return response;
  },

  status: async (connection) => {
    const url = await sails.helpers.removeTrailingSlash(connection.kongAdminUrl) + '/status';
    const response = await axios({
      method: 'GET',
      headers: KongService.makeRequestHeaders(connection, true),
      url
    });

    return response;
  },

  listAll :  async (connection, endpoint) => {

    const cleanUrl = await sails.helpers.removeTrailingSlash(connection.kongAdminUrl);
    let url = cleanUrl + endpoint;

    // Always add size=1000 the url just to be sure
    // no more than the needed amount of requests are performed
    const sizeParam = await sails.helpers.getUrlParameter(url, 'size');
    if(!sizeParam)  url += url.indexOf('?') > -1 ? `&size=1000` : `?size=1000`;

    sails.log.debug('KongService: listAll', url);

    var getData = async (previousData, url) => {


      const response = await axios({
        method: 'GET',
        headers: KongService.makeRequestHeaders(connection, true),
        url
      });

      const data = previousData.concat(response.data.data);

      if (response.data.next) {
        await getData(data, await sails.helpers.removeTrailingSlash(connection.kongAdminUrl) + response.body.next);
      }else{
        try {
          response.data.data = data;
          return await ProxyHooks.afterEntityList(endpoint.replace('/', '').split('?')[0], req, response.body)
        }catch(err) {
          return {
            data: []
          }
        }

      }
    };
    return getData([], `${url}`);
  }
}

module.exports = KongService;