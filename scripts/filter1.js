'use strict';


hexo.extend.filter.register("server_middleware", function addHeader(app) {
    console.log('1111');
    
    app.use(function addHeaderHandler(req, res, next) {
      res.setHeader("X-222", "3333");
      next();
    }, 9999999);
  });