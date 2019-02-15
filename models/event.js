const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({      
    name: String,
    where: {
        venue: String,
        adress: String
    },
    when: {
        date: String,
        from: String,
        to: String
    },
    info: String,
    price: Number,
    tickets: {
        available: Number,
        sold: Number
    }
})

let Event = mongoose.model('event', eventSchema);

module.exports = Event;