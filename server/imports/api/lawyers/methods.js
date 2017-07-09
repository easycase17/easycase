Meteor.methods({
    'lawyers.findLawyer'(lawyerId) {
        return Lawyers.findOne(lawyerId).name;
    }
});