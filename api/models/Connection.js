/**
 * Connection.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true
    },

    type: {
      type: 'string',
      isIn: ['default', 'key_auth', 'jwt'],
      defaultsTo: 'default'
    },

    kongAdminUrl: {
      type: 'string',
      required: true
    },

    netdataUrl : {
      type: 'string'
    },

    kongApiKey: {
      type: 'string',
      defaultsTo: ''
    },

    /**
     * JWT
     */
    jwtAlgorithm: {
      type: 'string',
      isIn: ['HS256', 'RS256'],
      defaultsTo: 'HS256'
    },

    jwtKey: {
      type: 'string'
    },

    jwtSecret: {
      type: 'string'
    },

    kongVersion: {
      type: 'string',
      required: true
    },

    healthChecks: {
      type: 'boolean',
      defaultsTo: false
    },

    healthCheckDetails: {
      type: 'json'
    },

    active: {
      type: 'boolean',
      defaultsTo: false
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

