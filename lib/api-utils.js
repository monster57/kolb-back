var ApiError = require('./api-error');



exports.inject = function( app ){

  app.response.apiSuccess = function( data, message ){
    var out = {
      success: true,
    };

    if( data instanceof String ){
      out.message = data;
      out.data = {};
    } else {
      out.message = message || 'Success';
      out.data = data;
    }

    return this.json( out );
  };



  app.response.apiError = function( err ){
    err = ApiError.create( err )
    this.status( err.status || 400 );
    this.json({
      success: false,
      message: err.message,
      data:{},
      errors: err.errors,
    });
  };


  app.response.apiLoginError = function( err ){
    err = ApiError.create( err )
    this.status( err.status || 403 );
    this.json({
      success: false,
      message: err.message,
      data:{},
      errors: err.errors,
    });
  };

}