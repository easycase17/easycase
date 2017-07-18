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

/* ------------------ Home -------------------- */
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

/* ---------------------- Cases ---------------------*/
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

/* ---------------------- Lawyers ---------------------*/
FlowRouter.route('/lawyers', {
    name: 'lawyers',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Lawyers' });
    }
});

FlowRouter.route('/lawyers/:id', {
    name: 'single-lawyer',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Lawyer' });
    }
});

/* ---------------------- Contracts ---------------------*/
FlowRouter.route('/contracts/:id', {
    name: 'single-contract',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Contract' });
    }
});

/* --------------------- Discover --------------------- */
FlowRouter.route('/discover', {
    name: 'discover',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Discovers' });
    }
});

/* --------------------- Tools --------------------- */
FlowRouter.route('/tools', {
    name: 'tools',
    action() {
        GAnalytics.pageview();
        BlazeLayout.render('MainLayout', { main: 'Tools' });
    }
});