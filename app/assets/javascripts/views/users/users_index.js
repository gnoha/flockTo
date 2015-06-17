FlockTo.Views.UsersIndex = Backbone.CompositeView.extend({
  template: JST['users/index'],

  className: 'users-index',

  events: {
    'click .user-index-item': 'navToUser',
  },

  initialize: function () {
    this.listenTo(this.collection, 'add sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeUsersIndexItem);
    this.listenTo(this.collection, 'add', this.addUsersIndexItem);
    this.collection.each(this.addUsersIndexItem.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addUsersIndexItem: function (user) {
    var subview = new FlockTo.Views.UsersIndexItem({ model: user });
    this.addSubview('.users-index-list', subview);
  },

  navToUser: function (event) {
    var userId = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/users/' + userId, {trigger: true});
  },

  removeUsersIndexItem: function (user) {
    this.removeModelSubview('.users-index-list', user);
  }
});
