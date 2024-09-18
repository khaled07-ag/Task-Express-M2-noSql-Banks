const { model, Schema } = require('mongoose');

const AccountsSchema = new Schema({
    username: {type: String},
    age: {type: Number},
});

module.exports = model("Account", AccountsSchema);