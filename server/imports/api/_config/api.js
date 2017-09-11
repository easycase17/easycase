// TODO: for the furture
API = {
    authentication: function (apiKey) {
        var getUser = APIKeys.findOne({ "key": apiKey }, { fields: { "owner": 1 } });
        if (getUser) {
            return getUser.owner;
        } else {
            return false;
        }
    },
    connection: function (request) {
        var getRequestContents = API.utility.getRequestContents(request),
            apiKey = getRequestContents.api_key,
            validUser = API.authentication(apiKey);

        if (validUser) {
            // Now that we've validated our user, we make sure to scrap their API key
            // from the data we received. Next, we return a new object containing our
            // user's ID along with the rest of the data they sent.
            delete getRequestContents.api_key;
            return { owner: validUser, data: getRequestContents };
        } else {
            return { error: 401, message: "Invalid API key." };
        }
    },
    handleRequest: function (context, resource, method) {
        var connection = API.connection(context.request);
        if (!connection.error) {
            API.methods[resource][method](context, connection);
        } else {
            API.utility.response(context, 401, connection);
        }
    },
    methods: {
        upload: {
            GET: function (context, connection) {
                // Check to see if our request has any data. If it doesn't, we want to
                // return all pizzas for the owner. If it does, we want to search for
                // pizzas matching that query.
                var hasQuery = API.utility.hasData(connection.data);
                var validData = API.utility.validate( connection.data, { "id": String });

                if ( hasQuery && validData ) {
                    // connection.data.owner = connection.owner;
                    var file = Uploads.find(connection.data).fetch();
                    if (download.length > 0) {
                        API.utility.response( context, 200, file );
                    } else {
                        API.utility.response( context, 404, { error: 404, message: "Did not find the requested file." } );
                    }
                } else {
                    API.utility.response( context, 403, { error: 403, message: "GET calls must have an id in the query." } );
                }
            },
            POST: function ( context, connection ) {
                // Make sure that our request has data and that the data is valid.
                var hasData = API.utility.hasData(connection.data);
                // var validData = API.utility.validate(connection.data, { "type": String });
                if ( hasData ) {
                    connection.data.owner = connection.owner;
                    var file = Uploads.insert( connection.data );
                    API.utility.response( context, 200, { "_id": file, "message": "File successfully stored!" } );
                }
            }
        }
    },
    utility: {
        getRequestContents: function (request) {
            switch (request.method) {
                case "GET":
                    return request.query;
                case "POST":
                case "PUT":
                case "DELETE":
                    return request.body;
            }
        },
        hasData: function (data) {
            return Object.keys(data).length > 0 ? true : false;
        },
        response: function (context, statusCode, data) {
            context.response.setHeader('Content-Type', 'application/json');
            context.response.statusCode = statusCode;
            context.response.end(JSON.stringify(data));
        },
        validate: function (data, pattern) {
            return Match.test(data, pattern);
        }
    }
};