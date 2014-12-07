
define([
    'backbone'
],function(Backbone ) {

    var Index = Backbone.View.extend({
        className: 'index',

        render: function () {
            var  self = this;
            $.get('templates/index.htm' , function(template){
                self.$el.html(template);
            });
            return this;
        }
    });

    return Index;

});
