var createThumb = function (fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
};

Collections.Avatars = new FS.Collection("ec_avatars", {
    stores: [
        new FS.Store.FileSystem("thumbs", { transformWrite: createThumb, path: "~/Desktop/thumbAvatars" }),
        new FS.Store.FileSystem("avatars")
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});