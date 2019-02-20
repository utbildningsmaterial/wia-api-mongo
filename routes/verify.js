// TICKETS

// model
let Ticket = require('../models/ticket');

// GET
module.exports.get = async (req, res) => {

    try {

        let ticket = await Ticket.find({ code: req.params.code});

        if(ticket.length == 1 && ticket[0].used == false){
            
            res.status(200).send({ msg: `Ticket is valid for event: ${ticket[0].event.name}.`, verified: true });
    
            // uppdaterar biljett till used
            await Ticket.findOneAndUpdate({ code: req.params.code },{
                used: true
            });

        } else {
        
            res.status(200).send({ msg: 'Ticket is NOT valid.', verified: false })
        
        }

    } catch(err) {
        console.error(err)
        res.status(500).send(err);
    }

}
