const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ticketSchema = new Schema({
    event: Object,
    code: String,
    used: { type: Boolean, default: false }
})

let Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;