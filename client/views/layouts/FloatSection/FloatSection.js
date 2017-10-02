
Template.FloatSection.events({
    'click #create-case': function () {
        FlowRouter.go('/cases/create');
    }
});

Template.FloatSection.rendered = function () {
    // ===== Scroll to Top ==== 
    $('#return-to-top').fadeOut();   // Else fade out the arrow
    $(window).scroll(function () {
        console.log($(this).scrollTop());
        if ($(this).scrollTop() > 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(100);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(100);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });
};