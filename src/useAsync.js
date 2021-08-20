import { useReducer, useEffect, useCallback } from 'react';

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
                users: action.data,
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

const useAsync = (callback, deps = [], skip = false) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(async () => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', e });
        }
    }, []);

    useEffect(() => {
        if (skip) {
            return;
        }
        fetchData();
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
};

export default useAsync;
