import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, IconButton } from '@mui/material';
import ContactDialog from './ContactForm';
import './ContactTable.css';  
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

const ContactsTable = () => {
    const [contacts, setContacts] = useState([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editContact, setEditContact] = useState(null);
    const limit = 10;

    const fetchContacts = async (page) => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/contacts', { params: { page, limit } });
            setContacts(response.data.contacts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts(page);
    }, [page]);

    const handleClickOpen = (contact = null) => {
        setEditContact(contact); 
        setOpen(true);
    };

    
    const handleClose = () => {
        setOpen(false);
        setEditContact(null);
    }

    const handleAddOrUpdateContact = async (newContact) => {
        if (editContact) {
            try {
                const updatedContact = await axios.put(`http://localhost:8080/api/v1/contacts/${editContact._id}`, newContact);
    
                setContacts(
                    contacts.map(contact => contact._id === updatedContact.data._id ? updatedContact.data : contact)
                );
                toast.success('Contact updated successfully!');
                setOpen(false);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error('Email or phone number already exists for another contact!');
                } else {
                    toast.error('Error updating contact.');
                }
                console.error('Error updating contact:', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/contacts', newContact);
                setContacts([response.data, ...contacts]);
                toast.success('Contact added successfully!');
                setOpen(false);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error('Contact already exists!');
                } else {
                    toast.error('Error adding contact.');
                }
                console.error('Error adding contact:', error);
            }
        }
    
    };
    const handleDeleteContact = async (contactId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/contacts/${contactId}`);
            setContacts(contacts.filter(contact => contact._id !== contactId));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="container">
            <AppBar position="static" className="appBar">
                <Toolbar className="toolbar">
                    <Typography variant="h6">
                        Welcome, User123
                    </Typography>
                    <Button color='white' variant="outlined" onClick={() => handleClickOpen()}>
                        Create Contact
                    </Button>
                </Toolbar>
            </AppBar>

            <TableContainer component={Paper} className="tableContainer">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell>{contact.firstName}</TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phoneNumber}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.jobTitle}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(contact)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteContact(contact._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                className="pagination"
            />
            <ContactDialog 
                open={open} 
                handleClose={handleClose} 
                handleAddContact={handleAddOrUpdateContact}
                editContact={editContact}
            />
        </div>
    );
};

export default ContactsTable;
