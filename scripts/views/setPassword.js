
define([
    'backbone',
    'lib/firebase-simple-login',
    'models/todoModel',
    'views/auth'

],function(Backbone  ) {

    var SetPassword = Backbone.View.extend({
        className : 'setPassword',
        template: '',

        events: {
            "click #setPassBtn": "SetPassword"
        },

        initialize: function () {

        },

        render: function () {
            var self = this;
            $.get('templates/setPassword.htm' , function(template){
                self.template = _.template(template);
                self.$el.html(self.template());
            });
            return this;
        },

        SetPassword: function (e) {
            e.preventDefault();
            var
                oldpassword = this.$("#oldpassword"),
                email = localStorage.getItem('email'),
                password = this.$("#password"),
                repassword = this.$("#repassword");

            this.$('button i').removeClass('hides');


            if(password.val().length < 5 || password.val().length >= 15){
                this.$('.error').html('Password is between 5 to 15 character').fadeIn('slow', function(){
                    $('button i').addClass('hides');
                });
                return;
            }
            if (password.val() !== repassword.val()) {
                this.$('.error').html('Password is not match').fadeIn('slow', function(){
                    $('button i').addClass('hides');
                });
                return;
            }

            auth.changePassword(email, oldpassword.val(), password.val(), function(error) {
                if (error === null) {
                    self.$('.error').html('Password changed successfully')
                        .removeClass('error')
                        .addClass('success-msg')
                        .fadeIn('slow', function(){
                        $('button i').addClass('hides');
                    });
                    oldpassword.val(''), password.val(''), repassword.val('');
                } else {
                    if (error.code == 'INVALID_PASSWORD') {
                        self.$('.error').html('Please type correct password').fadeIn('slow', function(){
                            $('button i').addClass('hides');
                        });
                    }

                }
            });
        }

    });

    return SetPassword;

});




