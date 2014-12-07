
define([

    'backbone',
    'views/index',
    'views/signup',
    'views/login',
    'views/profile',
    'views/mainView',
    'views/setPassword',
    'views/header',
    'views/list',
    'views/todo',
     'lib/firebase'

],function(Backbone , Index, Signup, Login, Profile, MainView , SetPassword, Header ,List ,todo  ) {

    var Route = Backbone.Router.extend({

        routes: {
            '': 'home',
            'signup': 'signup',
            'login': 'login',
            'profile' : 'profile',
            'setPassword' : 'setPassword',
            'list' : 'list'
        },
        showView: function(view, isRender){
            if(this.currentView){
                if(this.currentView.subViews){
                    _.each(this.currentView.subViews, function(subview){
                        subview.remove();
                    });
                }
                this.currentView.remove();
            }

            if(!isRender){
                $('.content').append(view.el);
            }
            else{
                $('.content').append(view.render().el);
            }
            this.currentView = view;
        },

        home: function () {
            if(this.currentView && this.currentView.$el.hasClass('index') ) return;
            var index = new Index();
            this.showView(index, '.home' ,true);
        },
        signup: function () {
            if(this.currentView && this.currentView.$el.hasClass('signup')) return;
            if((localStorage.getItem('login') == 'true')) return App.Router.navigate('', { trigger: true });
            var signup = new Signup();
            this.showView(signup, true);
        },
        login: function () {
            if(this.currentView && this.currentView.$el.hasClass('login')) return;
            if((localStorage.getItem('login') == 'true')) return App.Router.navigate('', { trigger: true });
            var login = new Login();
            this.showView(login, true);
        },
        profile : function(){
            if(this.currentView && this.currentView.$el.hasClass('profile')) return;
            if((localStorage.getItem('login') == 'false')) return App.Router.navigate('', { trigger: true });
            var profile = new Profile();
            this.showView(profile, false);
        },
        setPassword :  function(){
            if(this.currentView && this.currentView.$el.hasClass('setPassword')) return;
            if((localStorage.getItem('login') == 'false')) return App.Router.navigate('', { trigger: true });
            var setPassword = new SetPassword();
            this.showView(setPassword, true);
        },
        list :  function(){
            if(this.currentView && this.currentView.$el.hasClass('list')) return;
            if((localStorage.getItem('login') == 'false')) return App.Router.navigate('', { trigger: true });
            var list = new List();
            this.showView(list, true);
        }

    });

    function Application(){
        this.Settings = {
        }
    }

//INITIALIZING APP

    Application.prototype.initialize = function(){

        this.Router = new Route();

        var mainView = new MainView(),
            header = new Header() ;

        $('body').append(mainView.render().el);
        $('header').append(header.render().el);

        Backbone.history.start();

    };

    window.App = new Application();
    App.initialize();


});
