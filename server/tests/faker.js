/**
 * To create enough user data for demo
 */
"use strict";
import Cases from '/both/collections/cases/cases.collection.js';
var faker = require('faker');

class Faker {
    constructor() { }

    fakeUsers(num) {
        var users = [];
        for (var i = 0; i < num; i++) {
            var user = {
                username: faker.name.findName(),
                email: faker.internet.email(),
                password: '123456a',
                profile: {
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    gender: faker.random.number() % 3,
                    pinCode: faker.address.zipCode(),
                    birthday: faker.date.past(),
                    phoneNumber: faker.phone.phoneNumber()
                }
            };
            users.push(user);
        }
        return users;
    }

    fakeCases(num) {
        var count = Cases.count();
        console.log(count);
    }
}

module.exports = Faker;