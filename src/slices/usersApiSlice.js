import { apiSlice } from './apiSlice';
const AUTH_URL = '/api/auth';
const REGISTER_ADMIN_URL = '/api/admin';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin-admin`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${REGISTER_ADMIN_URL}/create-admin`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${REGISTER_ADMIN_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    })
});

export const { 
    useLoginMutation,
    useLogoutMutation, 
    useRegisterMutation,
    useUpdateUserMutation,
} = usersApiSlice;