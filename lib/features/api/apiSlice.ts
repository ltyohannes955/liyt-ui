import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your base API URL here
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Add any custom headers here (e.g., authentication tokens)
            // const token = localStorage.getItem('token');
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    tagTypes: ['Example'], // Add your tag types here
    endpoints: (builder) => ({
        // Example endpoint - replace with your actual endpoints
        getExample: builder.query<unknown, void>({
            query: () => '/example',
            providesTags: ['Example'],
        }),
        // Add more endpoints here
    }),
});

// Export hooks for usage in functional components
export const {
    useGetExampleQuery,
    // Export more hooks as you add endpoints
} = apiSlice;
