Collections.Avatars.allow({
    'insert': function(userId) {
        // add custom authentication code here
        if (userId) return true;
        return false;
    },
    'update': function(userId) {
        // add custom authentication code here
        if (userId) return true;
        return false;
    },
    'remove': function(userId) {
        // add custom authentication code here
        if (userId) return true;
        return false;
    },
    download: function(userId, fileObj) {
        return true
    }
});