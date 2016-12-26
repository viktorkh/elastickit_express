'use strict';

const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

let oktaIssuer;
let oktaDestinationUrl;
let oktaEntryPoint;
let oktaCert;
let oktaFields;

let loginUrl;
let logoutUrl;
let accessDeniedUrl;
let appUrl;

let addDefaultAccessDeniedPage = true;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

function setOptions(options) {

    if (!options.oktaIssuer || !options.oktaEntryPoint || !options.oktaCert) {
        throw new Error("Required options have to be defined: oktaIssuer, oktaEntryPoint, oktaCert");
    }

    appUrl = options.appUrl || '/';
    loginUrl = options.loginUrl || '/login';
    logoutUrl = options.logoutUrl || '/logout';
    oktaDestinationUrl = options.destinationUrl || '/login/callback';
    accessDeniedUrl = options.accessDeniedUrl || '/access-denied';
    if( typeof options.defaultAccessDeniedPage === 'undefined' ) {
        addDefaultAccessDeniedPage = true;
    } else {
        addDefaultAccessDeniedPage = options.defaultAccessDeniedPage;
    }
    oktaFields = options.oktaFields || ['email', 'firstName', 'lastName'];

    oktaIssuer = options.oktaIssuer;
    oktaEntryPoint = options.oktaEntryPoint;
    oktaCert = options.oktaCert;
}

function initPassportSamlStrategy() {
    passport.use(new SamlStrategy(
        {
            issuer: oktaIssuer,
            path: oktaDestinationUrl,
            entryPoint: oktaEntryPoint,
            cert: oktaCert
        },
        (profile, done) => {
            if (!profile.email) {
                return done(new Error("No email found"), null);
            }
            var user = {};
            oktaFields.forEach((paramName) => {
                user[paramName] = profile[paramName];
            });
            return done(null, user);
        }
    ));
}

function initApp(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.post(oktaDestinationUrl,
        passport.authenticate('saml', {failureRedirect: accessDeniedUrl, failureFlash: true}),
        (req, res) => res.redirect(appUrl));

    app.get(loginUrl,
        passport.authenticate('saml', {failureRedirect: accessDeniedUrl, failureFlash: true}),
        (req, res) => res.redirect(appUrl));

    app.get(logoutUrl, (req, res) => {
        req.session.destroy();
        res.redirect(accessDeniedUrl);
    });

    if (addDefaultAccessDeniedPage) {
        app.get(accessDeniedUrl, (req, res) => {
            res.status(401);
            res.type('text/html');
            res.end('You don\'t have access to this app.<br>Please <a href="' + loginUrl + '">login</a> using Okta.');
        });
    }
}

function secured(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(loginUrl);
}

function initialize(app, options) {
    setOptions(options);
    initPassportSamlStrategy();
    initApp(app);
}

module.exports = {
    initialize,
    secured
};
