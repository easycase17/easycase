Meteor.users.schema = Schemas.Users;
Meteor.startup(function () {
    Schemas.Users.i18n("SCHEMAS.UsersSchema");
    Meteor.users.attachSchema(Schemas.Users);
});
Meteor.users.allow({
    update: function (userId, doc) {
        return !!userId;
    }
});