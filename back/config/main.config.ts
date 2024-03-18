export const Config = {
    auth: process.env['AUTH'] || false,
    apiPath: process.env['API_PATH'] || '/api/v1',
    servicePath: {
        auth: process.env['AUTH_SERVICE_PATH'] || '/auth',
        post: process.env['POST_SERVICE_PATH'] || '/post',
        request: process.env['REQUEST_SERVICE_PATH'] || '/request',
    }
};