// Create FS Collection with Azure Storage
let lawforms = new FS.Collection("lawforms", {
    stores: [new FS.Store.Azure("lawform", {
        share: "lawforms",
        storageAccount: Meteor.settings.private.azure.storage.account,
        storageAccessKey: Meteor.settings.private.azure.storage.accessKey,
        folder: "/"
    })]
});

module.exports = { LawForms: lawforms };