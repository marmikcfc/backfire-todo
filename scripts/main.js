require.config({

    shim : {
        backbone : {
            deps: [
                'underscore',
                'jquery'
            ],
            exports : 'Backbone'
        },
        bootstrap : {
            deps :[
                'jquery'
            ],
            exports : 'jQuery'
        }
    },

    paths : {
        underscore: 'lib/underscore',
        jquery: 'lib/jquery.min',
        backbone: 'lib/backbone',
        bootstrap :'lib/bootstrap.min'
    }

});

require([
    'backbone',
    'routes/route',
    'views/mainView',
    'bootstrap'
],function (Backbone ,Routes , MainView , bootstrap) {

});
