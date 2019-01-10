module.exports = async function (req, res, proceed) {

  // Remove _csrf from query and body
  if(_.get(req,'query._csrf')) delete req.query._csrf;
  if(_.get(req,'body._csrf')) delete req.body._csrf;

  if (req.headers['connection-id'] || req.query.connection_id) {
    const connection = await sails.models.connection.findOne(req.headers['connection-id'] || req.query.connection_id);
    if(!connection) return res.notFound();
    req.connection = connection;
    return proceed();
  }else{

    // Get the connection from the requesting user
    if(req.me.connection) {
      req.connection = req.me.connection;
      return proceed();
    }else{
      return res.badRequest({
        message: "konga.api_error.undefined_connection"
      });
    }
  }




};
