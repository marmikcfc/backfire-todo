


define([

    'backbone',
    'lib/firebase',
    'lib/backbone-firebase.min'

],function(Backbone) {

    var List = Backbone.Model.extend({
        defaults: {
            id : 'null' ,
            title : 'What needs to be done!'
        }
    });

    return List;
});
