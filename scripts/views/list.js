
define([
    'backbone',
    'views/todo',
    'collections/lists',
    'models/todolist'

],function(Backbone, Todo ,  Lists ,todo ) {

    var List = Backbone.View.extend({
        collection : new Lists(),
        className: 'list',
        template: '',
        subViews : [],

    events: {
            'keypress #listTodo': 'addTodo'

        },
        initialize : function(){
            if(this.collection.length != 0){
                var slef = this;
                setTimeout(function(){
                    slef.collection.each(function(model){
                        var  todos = new Todo({model: model});
                        slef.$("#todo-list").append(todos.render().el);
                        slef.subViews.push(todos);
                    });
                }, 2000);
            }
            this.listenTo(this.collection, 'add', this.addOne);
        },

        addOne: function(todo) {
            var  todos = new Todo({model: todo});
            this.$("#todo-list").append(todos.render().el);
            this.subViews.push(todos);
        },


        render: function () {
            var self = this;
            $.get('templates/list.htm' , function(template){
                self.template = _.template(template);
                self.$el.html(self.template());
            });
            return this;
        },

        addTodo: function(e) {
            var  list = this.$('#listTodo');
            if (e.keyCode != 13) return;
            if (!list.val()) return;
            this.collection.add(
                {
                    userId : localStorage.getItem('loginId'),
                    title : list.val(),
                    check : 'unchecked'

                });
            list.val('');
        }

    });

    return List;

});
