var mongoose    = require('mongoose');

var planSchema  = new mongoose.Schema({
    name: String,
    overview: String,
    primary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    members: [{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    }]
});
module.exports = mongoose.model('Plan', planSchema);

