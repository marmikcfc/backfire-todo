
define([
    'backbone',
    'lib/firebase-simple-login',
    'views/auth'

],function(Backbone ) {

    var Header = Backbone.View.extend({
        className : 'header',
        events: {
            'click li.logout': 'logout'
        },
        initialize: function () {
           App.Router.listenTo(App.Router, 'route', this.changeTemplate);
        },

        render: function () {
            var  self = this;
            $.get('templates/header.htm' , function(template){
                self.$el.html(template);
            });
            return this;
        },

        changeTemplate:function(route){
           var  $header = $('header');
            setTimeout(function(){
                if(localStorage.getItem('login') === "true") {
                self.$('ul.user').removeClass('hide');
                self.$('ul.public').addClass('hide');
            }
            else{
                self.$('ul.user').addClass('hide');
                self.$('ul.public').removeClass('hide');
            }
            $header.find('.active').removeClass('active');
                $header.find('.' + route).addClass('active');
            }, 300);
        },

        logout : function(e) {
            auth.logout();
            localStorage.setItem('login', false);
            localStorage.removeItem('email');
            localStorage.removeItem('loginId');
            App.Router.navigate('login', { trigger: true });

        }
    });

    return Header;

});
