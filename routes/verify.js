// TICKETS

// model
let Ticket = require('../models/ticket');

// GET
module.exports.get = async (req, res) => {

    let ticket = await Ticket.find({ code: req.params.code});
    
    if(ticket.length == 1){
    
        res.status(200).send('Ticket is valid.')
    
    } else {
    
        res.status(406).send('Ticket is NOT valid.')
    
    }

}
