/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  // 'auth/me' : 'is-logged-in',

  UserController: {
    'find': ['is-logged-in','paginate'],
    'findOne': ['is-logged-in'],
    'destroy': ['is-super-admin','not-me'],
    'update': ['is-logged-in']
  },

  'user/change-password' : ['is-logged-in'],

  'permissions/list' : ['is-logged-in'],

};
