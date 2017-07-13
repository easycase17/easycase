Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        return Lawyers.findOne(lawyerId).name;
    },
    'lawyers.isLawyer'(userId) {
        return Lawyers.find({userId: userId}) ? true : false;
    }
});