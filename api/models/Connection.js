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
      unique: true,
      required: true
    },

    type: {
      type: 'string',
      isIn: ['no_auth', 'key_auth', 'jwt'],
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
      type: 'string'
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

  afterCreate: (value, next) => {
    // Get Kong version
    return next();

  }

};

