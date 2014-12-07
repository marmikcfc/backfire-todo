define([
    'backbone'
],function(Backbone ) {


    var MainView = Backbone.View.extend({
        className: 'container',
        render: function () {
            this.$el.append('<header></header>');
            this.$el.append("<div class = 'content'></div>");
            return this;
        }
    });

    return MainView;

});