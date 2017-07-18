/* ---------------------- Lawyers Template ---------------------- */
Template.Lawyers.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('lawyers');
    });
});

Template.Lawyers.helpers({
    lawyers: () => {
        return Lawyers.find({});
    }
});

/* -------------------- Lawyer Template ----------------------- */
Template.Lawyer.onCreated(function () {
    var self = this;
    GoogleMaps.ready('lawyerMap', function (map) {
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
    self.autorun(function () {
        var id = FlowRouter.getParam('id');
        self.subscribe('singleLawyer', id);
    });
});

Template.Lawyer.onRendered(function () {
    GoogleMaps.load({ v: '3', key: Meteor.settings.public.gmaps.key });
});

Template.Lawyer.helpers({
    lawyer: () => {
        var id = FlowRouter.getParam('id');
        return Lawyers.findOne({ _id: id });
    },
    lawyerMapOptions: () => {
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(47.658271, -122.3132746),
                zoom: 12
            };
        }
    }
});