import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, addUser } from './usersSlice';

const User = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector(state => state.users);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && email) {
            setSubmitting(true);
            setTimeout(() => {
                const newUser = {
                    id: Date.now(),
                    name: username,
                    email: email
                };
                dispatch(addUser(newUser));
                setUsername('');
                setEmail('');
                setSubmitting(false);
            }, 2000); 
        }
    };

    if (status === 'loading' || submitting) {
        return (
            <div className="loader">
                Loading users... <span className="spinner"></span>
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>
            


            <div className="container card">
                <h2>User Management</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Enter your Name..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter your Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Add User</button>
                </form>

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td data-label="Name">{user.name}</td>
                                <td data-label="Email">{user.email}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => dispatch(deleteUser(user.id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default User;