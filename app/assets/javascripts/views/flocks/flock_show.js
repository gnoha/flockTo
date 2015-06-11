FlockTo.Views.FlockShow = Backbone.CompositeView.extend({
  template: JST['flocks/show'],

  className: 'flock-show',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.addForm();
  },

  render: function() {
    var content = this.template({ flock: this.model });
    this.$el.html(content);

    return this;
  },

  addForm: function () {
    
  }
});
