import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkManager = () => {
    const [links, setLinks] = useState([]);
    const [form, setForm] = useState({ name: '', url: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            const response = await axios.get('/api/links');
            setLinks(response.data);
        };
        fetchLinks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`/api/links/${editingId}`, form);
        } else {
            await axios.post('/api/links', form);
        }
        setForm({ name: '', url: '' });
        setEditingId(null);
        const response = await axios.get('/api/links');
        setLinks(response.data);
    };

    const handleEdit = (link) => {
        setForm({ name: link.name, url: link.url });
        setEditingId(link._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/links/${id}`);
        const response = await axios.get('/api/links');
        setLinks(response.data);
    };

    return (
        <div>
            <h2>Link Manager</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="url"
                    placeholder="URL"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
                <button type="submit">{editingId ? 'Update' : 'Create'}</button>
            </form>
            <ul>
                {links.map((link) => (
                    <li key={link._id}>
                        {link.name} - {link.url}
                        <button onClick={() => handleEdit(link)}>Edit</button>
                        <button onClick={() => handleDelete(link._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LinkManager;
