
define([
    'routes/route',
    'lib/firebase-simple-login'

],function() {

    var myRef = new Firebase("https://todocirtru.firebaseio.com/");
    auth  = Auth(myRef);

    function Auth(ref) {
        return new FirebaseSimpleLogin(ref, function (error, user) {
            if (error) {
                if(error.code == 'INVALID_USER' || error.code == 'INVALID_EMAIL'){
                    $('.error').html('Please type a valid email').fadeIn('slow', function(){
                        $('button i').addClass('hides');
                    });
                }
                if(error.code == 'INVALID_PASSWORD'){
                    $('.error').html('Please type a correct password ').fadeIn('slow', function(){
                        $('button i').addClass('hides');
                    });
                }

            }
            else if (user) {
                if(localStorage.getItem('login') == 'true'){
                    return;
                }
                else{
                    localStorage.setItem('login', true);
                    localStorage.setItem('loginId',user.uid);
                    localStorage.setItem('email', user.email);
                    $("#email").val('');
                    $("#password").val('');
                    App.Router.navigate('list', { trigger: true });
                }


            }
        });
    }


});

