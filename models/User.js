const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        first: String,
        last: String,
        age: Number,
    },
    {
        toJSON: {
            virtuals: true,
            // TODO: Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
        },
        id: false,
    }
);

// TODO: Create a virtual property `fullName` on the userSchema
userSchema.virtual('fullName').get(function () {
    return this.first + ' ' + this.last;
})

// TODO: Create a getter for the virtual that returns the full name of the user (first + last)


// TODO: Create a setter for the virtual that sets the value of the first and last name, given just the `fullName`
userSchema.virtual('fullName').set(function (fullName) {
    const splitName = fullName.split(' ');
    this.first = splitName[0];
    this.last = splitName[1];
})

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
