
/**
 * EasyCase
 * @author Guocheng Wei <walterwei170@gmail.com>
 */

Schemas.CreatedBy = new SimpleSchema({
    authorId: {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    role: {
        type: String,
        allowedValues: [
            'lawyer',
            'user'
        ],
        autoform: {
            type: 'hidden'
        }
    }
});