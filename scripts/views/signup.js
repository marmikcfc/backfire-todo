
define([
    'backbone',
    'collections/collection',
    'lib/firebase-simple-login',
    'views/auth'

],function(Backbone, Users ) {


    var Signup = Backbone.View.extend({
        className : 'signup',

        events: {
            "click #singupBtn": "registration"
        },

        initialize: function () {
            console.log();
        },

        render: function () {
            var  self = this;
            $.get('templates/signup.htm' , function(template){
                self.$el.html(template);
            });
            return this;
        },

        registration: function (e) {
            e.preventDefault();

            var name = this.$("#name"),
                age = this.$("#age"),
                email = this.$("#email"),
                password = this.$("#password"),
                repassword = this.$("#repassword");


            this.$('button i').removeClass('hides');

            if(email.val() == "" || password.val() == ""){
                this.$('.error').html('All field must be required!').fadeIn('slow', function(){
                    $('button i').addClass('hides');
                });
                return ;
            }
            else {
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

            }
            auth.createUser(this.$("#email").val(), this.$("#password").val(), function (error, user) {
                var self = this,
                    users =  new Users();

                if (!error) {
                    App.Router.navigate('login', { trigger: true });
                    users.add({
                        id : user.uid ,
                        name : name.val(),
                        age : age.val(),
                        email : user.email
                    });
                    name.val('');
                    age.val('');
                    email.val('');
                    password.val('');
                    repassword.val('');
                }
                else {
                    if (error.code == 'INVALID_EMAIL') {
                        self.$('.error').html('Invalied email! Please type Correct email').fadeIn('slow', function(){
                            $('button i').addClass('hides');
                        });
                    }
                    if (error.code == 'EMAIL_TAKEN') {
                        self.$('.error').html('this email is already exists ').fadeIn('slow', function(){
                            $('button i').addClass('hides');
                        });
                    }
                }
            });
        }

});

    return Signup;

});




