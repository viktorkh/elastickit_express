# Okta-auth

Okta Authentication for ExpressJS (NodeJS).

## Example

Simple usage:

Install packages:

    npm install cookie-parser --save
    npm install body-parser --save
    npm install okta-auth --save
    npm install express-session --save
    // if you want to keep sessions in Redis:
    npm install redis --save
    npm install connect-redis --save
    npm install session-file-store --save-dev

Configure an app:

    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const oktaAuth = require('okta-auth');

    const session = require('express-session');

    // ===== BEGIN: if you want to keep sessions in Redis:
    const redis = require('redis');
    const RedisStore = require('connect-redis')(session);
    // ===== END: if you want to keep sessions in Redis.


    app.use(cookieParser());
    app.use(bodyParser());

    var sessionOptions = {
      secret: process.env.SESSION_SECRET,
      resave: true,
      cookie: {maxAge: process.env.SESSION_MAX_AGE},
      rolling: true,
      name: 'my-app-name'
    };

    // ===== BEGIN: if you want to keep sessions in Redis:
    // Use Redis store only on production and stage env
    if (process.env.REDIS_URL) {
      const redisClient = redis.createClient({url: process.env.REDIS_URL});
      sessionOptions.store = new RedisStore({
        client: redisClient,
        ttl: sessionOptions.cookie.maxAge
      });
    } else { // Use file store on local environment
      try {
        var FileStore = require('session-file-store')(session);
        sessionOptions.store = new FileStore({
          path: '/tmp/sessions',
          ttl: sessionOptions.cookie.maxAge
        });
      } catch (e) {
        console.error(e);
      }
    }
    // ===== END: if you want to keep sessions in Redis.

    app.use(session(sessionOptions));

    oktaAuth.initialize(app, {
      oktaIssuer: process.env.OKTA_ISSUER,          // required
      oktaEntryPoint: process.env.OKTA_ENTRY_POINT, // required
      oktaCert: process.env.OKTA_CERT               // required
    });

    app.get('/my-secured-url', oktaAuth.secured, (req, res) => {
      res.render('index');
    });

You can create own page for not logged users:

    // ...

    oktaAuth.initialize(app, {
      // ...
      accessDeniedUrl: accessDeniedUrl, // default: /access-denied
      defaultAccessDeniedPage: false    // default: true
    });

    app.get(accessDeniedUrl, (req, res) => {
      res.render('access-denied');
    });

    // ...

You can configure Okta to pass some information about users.
You have access to it in `req.session.passport.user`

    // ...

    oktaAuth.initialize(app, {
        // ...
        oktaFields: ['email', 'position', 'department']; // default: ['email', 'firstName', 'lastName']
    ));

    app.get('/my-secured-url', oktaAuth.secured, (req, res) => {
      res.render('index', {user: req.session.passport.user});
    });

    // ...
