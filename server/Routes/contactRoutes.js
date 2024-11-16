import express from 'express';
import Contact from '../models/Contact.js'

const router = express.Router();

router.post('/contacts', async (req, res) => {
    try {
        const existingContact = await Contact.findOne({
            $or: [{email: req.body.email}, { phoneNumber: req.body.phoneNumber }]
        });

        if(existingContact){
            return res.status(400).json({ message: 'Email or phone Number alreday Exists'})
        }
        const contact = new Contact(req.body);
        console.log(req.body)
        console.log("new",contact)
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
        
    }
})
router.get('/contacts', async (req, res) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10; 

    try {
        const contacts = await Contact.find()
            .skip((page - 1) * limit)
            .limit(limit); 

        const totalContacts = await Contact.countDocuments(); 
        res.json({
            contacts,
            totalContacts,
            totalPages: Math.ceil(totalContacts / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/contacts/:id', async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;
        const contactId = req.params.id;

    
        const existingContact = await Contact.findOne({
            _id: {$ne: contactId},
            $or: [{ email }, { phoneNumber}]
        });

        if(existingContact){
            return res.status(400).json({
                message: 'Email or phone number alreday exists for another contact'
            })
        }

        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})
router.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

export default router;