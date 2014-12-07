
define([

    'backbone',
    'lib/firebase',
    'lib/backbone-firebase.min'

],function(Backbone) {

    var User = Backbone.Model.extend({
        defaults: {
            id : 'null' ,
            name : 'username',
            age : 'null',
            email : 'eaxample@serviceprovider.com'
        }
    });

    return User;
});
