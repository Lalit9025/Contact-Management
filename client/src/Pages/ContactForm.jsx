import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import toast from 'react-hot-toast';

const ContactForm = ({ open, handleClose, handleAddContact, editContact }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editContact) {
            setContact(editContact); 
        } else {
            setContact({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: ''
            });
        }
    }, [editContact]);

    const validateFields = () => {
        const newErrors = {};
        if (!contact.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!contact.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!contact.email.trim()) newErrors.email = 'Email is required';
        if (!contact.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!contact.company.trim()) newErrors.company = 'Company is required';
        if (!contact.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required';

        return newErrors;
    };

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fill all required fields'); 
            return; 
        }

        handleAddContact(contact);
        
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{editContact ? 'Edit Contact' : 'Create Contact'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={contact[field]}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors[field]} 
                            helperText={errors[field]} 
                        />
                    ))}
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {editContact ? 'Update Contact' : 'Add Contact'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactForm;
