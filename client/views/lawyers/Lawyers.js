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

Template.LawyersItem.helpers({
    areasHtml: () => {
        var areas = Template.instance().data.areas;
        var areasView = [];

        areas.forEach(function(tag) {
            areasView.push(`<div class="attribute-tag"><span class="text">${tag}</span></div>`);
        });
        areasView = areasView.join('');
        return areasView;
    }
});

/* -------------------- Lawyer Template ----------------------- */
Template.Lawyer.onCreated(function () {
    var self = this;
    var id = FlowRouter.getParam('id');
    var subs = self.subscribe('singleLawyer', id);

    // View counts inc
    Meteor.call('lawyers.viewLawyer', id);

    self.autorun(function () {
        if (!subs.ready()) {
            return;
            Session.set('isLoading', true);
        }

        // Load until the map is ready
        Session.set('isLoading', false);

        var lyrloc = Lawyers.findOne({ _id: id }).location;
        GoogleMaps.ready('lawyerMap', function (map) {
            var address = `${lyrloc.street}, ${lyrloc.city}, ${lyrloc.state}, ${lyrloc.country}`; 
            var geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            map.instance.setCenter(results[0].geometry.location);

                            var infowindow = new google.maps.InfoWindow(
                                {
                                    content: '<b>' + address + '</b>',
                                    size: new google.maps.Size(150, 50)
                                });

                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map.instance,
                                title: address
                            });
                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.open(map.instance, marker);
                            });

                        } else {
                            alert("No results found");
                        }
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        });
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
                // This is the place I anounce this feature
                center: new google.maps.LatLng(47.658271, -122.3132746),
                zoom: 14,
                mapTypeControl: true,
                mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                navigationControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
    }
});

Template.Lawyer.onDestroyed(function() {
    Session.set('isLoading', true);
});