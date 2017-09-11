// For the future
var uploadStore = new FS.Store.GridFS("ec-uploads", {
    maxTries: 2, // optional, default 5
    chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

Uploads = new FS.Collection("ec-uploads", {
    stores: [uploadStore]
});