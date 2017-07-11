if (Meteor.isClient) {
    Accounts.onLogin(function() {
        FlowRouter.go('cases');
    });

    Accounts.onLogout(function() {
        FlowRouter.go('home');
    });
}

FlowRouter.triggers.enter([function() {
    if (!Meteor.userId()) {
        FlowRouter.go('home');
    }
}]);

FlowRouter.route('/', {
    name: 'home',
    action() {
        if (Meteor.userId()) {
            FlowRouter.go('cases');
        }
        GAnalytics.pageview(); 
        BlazeLayout.render('HomeLayout')
    }
});

FlowRouter.route('/cases', {
    name: 'cases',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Cases' });
    }
});

FlowRouter.route('/cases/create', {
    name: 'create-case',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'NewCase' });
    }
});

FlowRouter.route('/cases/:id', {
    name: 'single-case',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Case' });
    }
});
