
define([
    'backbone',
    'views/auth',
    'lib/firebase-simple-login',
    'routes/route'

],function(Backbone  ) {

    var Login = Backbone.View.extend({
        className : 'login',
        events: {
            "click #loginBtn": "loginValid"
        },

        render: function () {
            var  self = this;
            $.get('templates/login.htm' , function(template){
                self.$el.html(template);
            });
            return this;
        },

        loginValid :function(e) {
            this.$('button i').removeClass('hides');

            var email = this.$("#email").val(),
                password = this.$("#password").val();

            auth.login('password', {
                email: email,
                password: password
            });
            e.preventDefault();
        }

    });

    return Login;

});
