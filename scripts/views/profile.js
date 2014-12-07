
define([
    'backbone',
    'collections/collection'

],function(Backbone, Users ) {

    var Profile = Backbone.View.extend({
        collection : new Users(),
        className: 'profile',
        template: '',

        events: {
            'click #updateBtn': 'update'
        },

        initialize : function(){
            var self = this;

            $.get('templates/profile.htm' , function(template){
                self.template = _.template(template);

            });
            this.$el.append("<img class='loading' src='img/loading.gif'>");
            this.listenTo(this.collection, 'change', this.render);
            this.render()
        },

        render: function () {
            var self = this;

            setTimeout(function(){
                model = self.collection.findWhere({id: localStorage.getItem('loginId')});
                if(model){
                    self.$el.html(self.template(model.toJSON()));
                }
                return this;
            }, 3000);
        },

        update: function(e) {
            this.$('button i').removeClass('hides');
            var
                name = this.$('#name'),
                age = this.$('#age');
            model.set({
                name : name.val(),
                age : age.val()

        });
            this.$('button i').addClass('hides');

            e.preventDefault();
        }
    });

    return Profile;

});
