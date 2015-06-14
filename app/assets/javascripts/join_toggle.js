$.JoinToggle = function (el) {
  // ...
};

$.JoinToggle.prototype.method1 = function () {
  // ...
};

$.fn.joinToggle = function () {
  return this.each(function () {
    new $.JoinToggle(this);
  });
};

$(function () {
  $("button.join-toggle").joinToggle();
});



  // // joining: function () {
  // //   $('.join-flock').toggleClass('joining').attr('disabled');
  // // },
  // //
  // isJoined: function () {
  //   this.model.attributes.attendeeIds.indexOf(CURRENT_USER_ID) !== -1;
  // },
  //
  // joinAction: function () {
  //   //Not joined -> Join
  //   $joinButton = $('button.join-flock');
  //
  //   if ($joinButton)
  //   $joinButton.removeClass('not-joined');
  //   $joinButton.addClass('joined');
  //   $joinButton.text('Leave Flock')
  // },
