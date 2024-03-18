export const Config = {
    auth: process.env['AUTH'] || false,
    apiHost: process.env['NEXT_PUBLIC_HOST_URL'] || 'http://localhost:4000',
    apiPath: process.env['NEXT_PUBLIC_API_PATH'] || '/api/v1',
    servicePath: {
        auth: process.env['NEXT_PUBLIC_AUTH_SERVICE_PATH'] || '/auth',
        post: process.env['NEXT_PUBLIC_POST_SERVICE_PATH'] || '/post',
        request: process.env['NEXT_PUBLIC_REQUEST_SERVICE_PATH'] || '/request',
    }
};