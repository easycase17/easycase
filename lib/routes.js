FlowRouter.route('/', {
    name: 'home',
    action() {
        GAnalytics.pageview(); 
        BlazeLayout.render('MainLayout')
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
