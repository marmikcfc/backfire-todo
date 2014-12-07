

define([

    'backbone',
    'models/todoModel',
    'lib/firebase',
    'lib/backbone-firebase.min'

],function(Backbone , User) {

    var Users = Backbone.Firebase.Collection.extend({
        model: User,
        firebase: new Firebase("https://todocirtru.firebaseio.com/users")
    });


    return Users;
});
