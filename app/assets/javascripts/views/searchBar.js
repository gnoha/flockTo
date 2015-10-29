FlockTo.Views.SearchBar = Backbone.View.extend({
  template: JST['searchBar'],

  events: {
    'click .open-nav-search': 'openModal'
  },

  initialize: function () {
    console.log('search bar');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  openModal: function (e) {
    $('#nav-search').modal();
  },

})