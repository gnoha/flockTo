$.Disco = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.makeDisco();
  this.flash();
};

$.Disco.prototype.makeDisco = function () {

  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j ++) {
      $('<div>', {class: 'disco'}).appendTo(this.$el)
      .css('background', this.getColor());
    }
  }
};

$.Disco.prototype.disco = function () {
  $('.disco').each(function (i ,tile) {
    $(tile).css('background', this.getColor());
  }.bind(this));
};

$.Disco.prototype.flash = function () {
  setInterval(this.disco.bind(this), 200);
};


$.Disco.prototype.getColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

$.fn.disco = function () {
  return this.each(function () {
    new $.Disco(this);
  });
};
