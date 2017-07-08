FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout')
    }
});

FlowRouter.route('/cases', {
    name: 'create-case',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Cases' });
    }
});

FlowRouter.route('/cases/create', {
    name: 'create-case',
    action() {
        BlazeLayout.render('MainLayout', { main: 'NewCase' });
    }
});