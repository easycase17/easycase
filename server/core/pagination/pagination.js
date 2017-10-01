import { _ } from 'meteor/underscore';
import { Meteor, Mongo } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

class Pagination {
    constructor(collectionArray, settings) {
        if (typeof settings !== 'object') {
            throw Meteor.Error(4001, 'Invalid settings in Pagination. It needs to be object!');
        }

        if (!Array.isArray(collectionArray)) {
            throw Meteor.Error(4001, 'Invalid collectionArray in Pagination. It needs to be Array!');
        }

        this.settings = _.extend(
            {
                perPage: 10,
                reqPage: 1
            },
            settings || {}
        );

        this.collectionArray = collectionArray;

    }

    setPerPage(perPage) {
        check(perPage, Number);
        this.settings.perPage = perPage;
    }

    setReqPage(reqPage) {
        check(reqPage, Number);
        this.settings.reqPage = reqPage;
    }

    getResults() {
        var startIndex = this.settings.perPage * (this.settings.reqPage - 1);
        return this.collectionArray.slice(startIndex, startIndex + this.settings.perPage);
    }
}

module.exports = Pagination;