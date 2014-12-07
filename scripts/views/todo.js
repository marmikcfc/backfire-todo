
define([
    'backbone',
    'collections/lists'

],function(Backbone, Lists ) {

    var Todo = Backbone.View.extend({
        tagName:  'tr',
        className : 'warning',
        collection : new Lists(),
        template: '',

        events : {
            'click span.del' : 'delete',
            'click span.edit' : 'edit',
            'click span.update' : 'update',
            'click span.cancel' : 'cancel',
            'click #check' : 'checked'

        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);

        },

        render: function () {
            var self = this ,
                $total = $('.heading').find('span.total');

            $total.text('Total Items : ' + this.collection.length);
            $.get('templates/todos.htm' , function(template){
                self.template = _.template(template);
                self.$el.html(self.template(self.model.toJSON()));
                self.check();
            });
            return this;
        },

        delete: function() {
            this.collection.remove(this.model);
            $total = $('.heading').find('span.total');
            $total.text('Total Items : ' + this.collection.length);
            this.check();
        },

        edit : function(){
            var  editTitle = this.$('#editTitle');

            this.$el.addClass("editing");
            this.$('span.edit').addClass('glyphicon-check update').removeClass('glyphicon-edit edit');
            this.$('span.cancel').removeClass('hide');
            editTitle.focus();
        },

        update: function() {
            var  editTitle = this.$('#editTitle'),
                 check = this.$('#check').is(":checked");

            this.$el.removeClass("editing");
            this.cancel();
            this.model.set({
                title : editTitle.val(),
                check : check
            });

        },

        cancel : function(){
            this.$el.removeClass("editing");
            this.$('span.update').removeClass('glyphicon-check update').addClass('glyphicon-edit edit');
            this.$('span.cancel').addClass('hide');
        },

        check : function(){
            var $remaining ;

            if(this.$('#check').is(":checked")){
                this.$el.removeClass("warning");
                this.$el.addClass("success");
            }
            else{
                this.$el.removeClass("success");
                this.$el.addClass("warning");
            }
            setTimeout(function(){
                var done  = $('tbody tr.success').length;
                var notDone  = $('tbody tr.warning').length;
                $remaining = $('.heading').find('span.remaining');
                $remaining.text(done + ' of '+ notDone + ' remaining ');
            }, 100);
        },

        checked : function() {
            var check;
            if (this.$('#check').is(":checked")) {
                check = 'checked'
            }
            else {
                check = 'unchecked'
            }
            this.model.set({
                check: check
            });

        }
    });

    return Todo;

});
