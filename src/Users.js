import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    users: null,
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                users: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                users: action.users,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                users: null,
                error: action.error,
            };
        default:
            throw new Error('unhandled action type');
    }
}

const Users = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { users, loading, error } = state;

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: 'LOADING' });
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/users/',
                );
                dispatch({ type: 'SUCCESS', users: response.data });
            } catch (e) {
                dispatch({ type: 'ERROR', error: e });
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>로딩중</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!users) return null;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {users.username} {user.name}
                </li>
            ))}
        </ul>
    );
};

export default Users;
