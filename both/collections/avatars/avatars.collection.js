Collections.Avatars = new FileCollection('ec_avatars',
    {
        resumable: true,   // Enable built-in resumable.js upload support
        http: [
            {
                method: 'get',
                path: '/:id',  // this will be at route "/gridfs/:id"
                lookup: function (params, query) {  // uses express style url params
                    return { _id: new Mongo.ObjectID(params.id) };       // a query mapping url to avatar
                }
            }
        ]
    }
);