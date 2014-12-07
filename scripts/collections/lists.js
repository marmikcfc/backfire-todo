


define([

    'backbone',
    'models/todolist',
    'lib/firebase',
    'lib/backbone-firebase.min'

],function(Backbone , List) {

    var Lists = Backbone.Firebase.Collection.extend({
        model: List,
        firebase: new Firebase("https://todocirtru.firebaseio.com/lists")
    });


    return Lists;
});
