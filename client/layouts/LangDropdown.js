Template.i18n_custom_dropdown.events({
    'click a': function (event) {
        event.preventDefault();
        TAPi18n.setLanguageAmplify(this.tag)
    }
});