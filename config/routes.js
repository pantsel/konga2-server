/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  /**
   * Auth & Security routes
   */
  'POST /api/v1/auth/login'  : { action: 'auth/login' },
  '/api/v1/auth/logout'      : { action: 'auth/logout' },
  'POST /api/v1/auth/signup' : { action: 'auth/signup' },
  "GET /api/v1/security/csrfToken": { action: "security/grant-csrf-token" },

  '/api/v1/app/init'     : { action: 'app/init' },


  'POST /api/v1/users/:id/changePassword'     : { action: 'user/change-password' },


  '/api/v1/permissions'     : { action: 'permissions/list' },

  'POST /api/v1/connections/check'     : 'ConnectionController.check',



  /**
   * Kong routes
   */

  'GET /kong': 'KongProxyController.proxy',
  'GET /kong/status': 'KongProxyController.proxy',
  'GET /kong/plugins/schema/:plugin': 'KongProxyController.proxy',

  // Kong entities routes
  'GET /kong/:entity': 'KongProxyController.listProxy',
  'GET /kong/:entity/:id': 'KongProxyController.proxy',
  'GET /kong/:entity/:id/:child_entity': 'KongProxyController.listProxy',

  // Fall back to proxy
  'POST /kong/*': 'KongProxyController.proxy',
  'PUT /kong/*': 'KongProxyController.proxy',
  'PATCH /kong/*': 'KongProxyController.proxy',
  'DELETE /kong/*': 'KongProxyController.proxy'



};
