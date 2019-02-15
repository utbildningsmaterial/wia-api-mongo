// TICKETS

// model
let Ticket = require('../models/ticket');
let Event = require('../models/event');

// GET
module.exports.get = async (req, res) => {
    
    try {

        res.status(200).send( await Ticket.find({}) );        
    
    } catch(err){
    
        res.status(500).send(err.stack);
    
    }
}

// POST
module.exports.post = async (req, res) => {
    
    try {

        // get event info
        let event = await Event.findById(req.body.event);
        
        let tickets = [];

        for(i=0; i<req.body.amount; i++){

            let ticket = {
                event: event,
                code: uid(5),
                used: false
            }

            tickets.push(ticket);
        }

        // write tickets to Mongo
        let resp = await Ticket.create(tickets);
        // Send to FrontEnd
        res.status(200).send(resp);
    } catch(err) {
        res.status(500).send(err.stack);
    }

}

function uid(len){

    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    let Arr = [];

    for(let i=0; i<len; i++){
        Arr.push(chars[Math.floor(Math.random()*chars.length)]);
    }

    return Arr.join('');
}