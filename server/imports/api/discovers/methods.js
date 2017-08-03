Meteor.methods({
    'discovers.getCases': function (searchRule) {
        if (this.userId) {
            var cases;
            var pipeline = [
                {
                    $match: {
                        isPrivate: false
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "createdBy_info"
                    }
                },
                {
                    $unwind: "$createdBy_info"
                },
                {
                    $project: {
                        title: 1, tags: 1, content: 1, languages: 1, location: 1,
                        createdAt: 1, createdBy: 1, isPrivate: 1, isComplete: 1,
                        "createdBy_info._id": 1, "createdBy_info.username": 1
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ]

            // There is a search request
            if (searchRule) {
                switch (searchRule.type) {
                    case 'Time':
                        var milisecsDay = 24 * 60 * 60 * 1000;
                        switch (searchRule.value) {
                            case '1':
                            case '7':
                            case '30':
                            case '365':
                                pipeline = [
                                    {
                                        $project: {
                                            title: 1, tags: 1, content: 1, languages: 1, location: 1,
                                            createdAt: 1, createdBy: 1, isPrivate: 1, isComplete: 1,
                                            dateDifference: { $subtract: [new Date(), "$createdAt"] }
                                        }
                                    },
                                    {
                                        $match: {
                                            isPrivate: false,
                                            dateDifference: { $lte: parseInt(searchRule.value) * milisecsDay }
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "users",
                                            localField: "createdBy",
                                            foreignField: "_id",
                                            as: "createdBy_info"
                                        }
                                    },
                                    {
                                        $unwind: "$createdBy_info"
                                    },
                                    {
                                        $project: {
                                            title: 1, tags: 1, content: 1, languages: 1, location: 1,
                                            createdAt: 1, createdBy: 1, isPrivate: 1, isComplete: 1,
                                            "createdBy_info._id": 1, "createdBy_info.username": 1
                                        }
                                    },
                                    {
                                        $sort: {
                                            createdAt: -1
                                        }
                                    }
                                ]
                                break;
                            default:
                                // Any time

                        }
                };
            } else {
                // if no rule, which means any time
            }

            // Cases
            cases = Cases.aggregate(pipeline);

            return cases;
        } else {
            throw new Meteor.Error('IllegalUserError', 'In discovers.getCases method');
        }
    },

    'discovers.getLawyers': function(searchRule) {
        if (this.userId) {
            var lawyers;
            var pipeline = [
                {
                    $project: {
                        name: 1, birthday: 1, gender: 1, areas: 1,
                        location: 1, evaluation: 1, rate: 1
                    }
                }
            ]

            if (searchRule) {
               // @TODO Handle different searchRule
            }

            // Lawyers
            lawyers = Lawyers.aggregate(pipeline);

            return lawyers;
        } else {
            throw new Meteor.Error('IllegalUserError', 'In discovers.getCases method');
        }
    }
});