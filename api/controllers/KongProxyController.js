/**
 * KongProxyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Kong = require('../services/Kong');
const axios = require('axios');
const ProxyHooks = require('../services/KongProxyHooks');

function getEntityFromRequest(req) {

  if(req.params.entity) return req.params.entity;
  if(!req.path) return null;

  return req.path.replace('/kong', '').split("/").filter(function (e) {
    return e;
  })[0];
}

const self = module.exports = {

  /**
   * Proxy requests to native Kong Admin API
   * @param req
   * @param res
   */
  proxy: async (req, res) => {

    req.url = req.url.replace('/kong', ''); // Remove the /kong prefix
    var entity = getEntityFromRequest(req);

    sails.log.debug("KongProxyController:req.method", req.method)
    sails.log.debug("KongProxyController:req.url", req.url)
    sails.log.debug("KongProxyController:entity", entity)


    if (!req.connection) {
      return res.badRequest({
        message: 'No Kong connection is defined'
      });
    }

    sails.log("Kong admin url =>", req.connection.kongAdminUrl);

    const instance = axios.create({
      baseURL: await sails.helpers.removeTrailingSlash(req.connection.kongAdminUrl) + req.url,
      headers: Kong.makeRequestHeaders(req.connection, true)
    });

    // Assign Konga correlations to a var if set in the request
    let kongaExtras;
    if(req.body && req.body.extras) {
      kongaExtras = req.body.extras;
      // Remove the correlations attribute so that we don't break the request to Kong.
      // If we need them later, they will be available in the `kongaExtras` var
      delete req.body.extras;
    }


    // Apply before Hooks
    switch(req.method.toLowerCase()) {
      case "patch":
        const data = await ProxyHooks.beforeEntityUpdate(
          entity,
          req.param("id"),
          req.connection.id,
          _.merge(req.body,{extras: kongaExtras}));
        req.body = data; // Assign the resulting data to req.body
        try{
          return await self.send(entity, instance, kongaExtras, req, res)
        }catch (e) {
          sails.log.error(e);
          res.status(e.response.status);
          return res.send(e.response.data);
        }

      default:
        try{
          return await self.send(entity, instance, kongaExtras,  req, res);
        }catch (e) {
          sails.log.error(e);
          res.status(e.response.status);
          return res.send(e.response.data);
        }

    }

  },

  /**
   * All GET listing methods to Kong will be using this method
   * @param req
   * @param res
   */
  listProxy: async (req, res) => {
    req.url = req.url.replace('/kong', ''); // Remove the /kong prefix
    const entity = req.params.entity;

    sails.log.debug("KongProxyController:listAllEntityRecords:req.method", req.method)
    sails.log.debug("KongProxyController:listAllEntityRecords:req.url", req.url)
    sails.log.debug("KongProxyController:listAllEntityRecords:entity", entity)

    try {
      const resp = await Kong.listAll(req.connection, req.url);
      return res.json(resp);
    }catch (e) {
      res.status(e.response.status);
      return res.send(e.response.data);
    }
  },


  /**
   * Actually send the request to Kong
   * @param entity
   * @param instance
   * @param kongaExtras
   * @param req
   * @param res
   */
  send: async (entity, instance, kongaExtras, req, res) => {


    sails.log("KongProxyController:send:entity", entity);
    sails.log("KongProxyController:send:kongaExtras", kongaExtras);


    const response = await instance({
      method: req.method.toLowerCase(),
      data: req.body
    });

    // Apply after Hooks
    switch(req.method.toLowerCase()) {
      case "get":
        try {
          const data = await ProxyHooks.afterEntityRetrieve(entity, req, response.data);
          return res.json(data);
        }catch (e) {
          res.status(e.response.status);
          return res.send(e.response.data);
        }

      case "post":
        try {
          const data =  await ProxyHooks.afterEntityCreate(entity, req, response.data, kongaExtras || {});
          return res.json(data);
        }catch (e) {
          res.status(e.response.status);
          return res.send(e.response.data);
        }
      case "delete":
        try {
          const data =  await ProxyHooks.afterEntityDelete(entity,req);
          return res.json(data);
        }catch (e) {
          res.status(e.response.status);
          return res.send(e.response.data);
        }
      default:
        return res.json(response.data)
    }
  }

};

