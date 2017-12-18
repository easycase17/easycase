Meteor.methods({
    'discovers.getCases': function (word, searchRule, page) {
        if (this.userId) {
            let cases;

            Collections.Cases._ensureIndex( { content: "text" } );

            let pipeline = [
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
                        title: 1, tags: 1,
                        content: { $substr: [ "$content", 0, 600 ] },
                        languages: 1, location: 1,
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
                                            title: 1, tags: 1,
                                            content: { $substr: [ "$content", 0, 600 ] },
                                            languages: 1, location: 1,
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

            // Check word type, if invalid change to default value
            if (word && typeof word === 'string' && word.length != 0) {
                pipeline.unshift({
                    $match: { $text: { $search: word } }
                });
            }

            // For pagination
            page = page || { perPage: 10, reqPage: 1 };

            let numPages = Math.ceil(Collections.Cases.aggregate(pipeline).length / page.perPage);

            // Paginations
            pipeline.push(
                { $skip: (page.reqPage - 1) * page.perPage },
                { $limit: page.perPage }
            );


            return {
                data: Collections.Cases.aggregate(pipeline),
                numPages: numPages
            };
        } else {
            throw new Meteor.Error('IllegalUserError', 'In discovers.getCases method');
        }
    },
    'discovers.avvoLawyers'(searchRule, page) {
        this.unblock();
        try {
            page = page || {
                perPage: 10,
                reqPage: 1
            };

            let result = HTTP.call('GET', 'https://api.avvo.com/api/4/lawyers/search.json', {
                params: {
                    page: page.reqPage,
                    perPage_page: page.perPage
                },
                headers: {
                    Authorization: "Bearer " + Meteor.settings.private.avvo.access_token
                }
            });

            return {
                data: result.data.lawyers,
                numPages: result.data.meta.total_pages
            };
        } catch (error) {
            // Got a network error, timeout, or HTTP error in the 400 or 500 range.
            return false;
        }
    },
    'discovers.getLawyers': function(searchRule, page) {
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
            lawyers = Collections.Lawyers.aggregate(pipeline);

            // Paginations
            var Pagination = require('/server/core/pagination/pagination');
            page = page || {
                perPage: 10,
                reqPage: 1
            };
            var numPages = Math.ceil(lawyers.length / page.perPage);
            var pagination = new Pagination(lawyers, page);

            return {
                data: pagination.getResults(),
                numPages: numPages
            };
        } else {
            throw new Meteor.Error('IllegalUserError', 'In discovers.getCases method');
        }
    }
});