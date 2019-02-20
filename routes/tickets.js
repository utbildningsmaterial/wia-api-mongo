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

        // Finns biljetter? Får min beställning plats?
        // Uppdatera event med sålda biljetter

        // get event info
        let event = await Event.findById(req.body.event);

        if(event.tickets.available >= (event.tickets.sold + req.body.amount)){
            // Finns biljetter kvar!
            console.info('Tickets are available!');

            // Uppdatera event > sold tickets
            let newSold = event.tickets.sold + req.body.amount;

            await Event.findOneAndUpdate({ _id: req.body.event}, {
                tickets: {
                    sold: newSold,
                    available: event.tickets.available    
                }
            });

            // Skapa biljetter och skicka tillbaka till FE
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

        } else {
            // Finns INTE biljetter kvar.
            console.info('Sorry, all tickets are sold.');
            res.status(200).send('Sorry, all tickets are sold.');
        }

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
};
