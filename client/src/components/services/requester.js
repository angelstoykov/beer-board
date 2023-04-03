export const request = async (method, token, url, data) => {
    const options = {};
    
    debugger
    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
    }
    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = (token) => {
    return {
        get: request.bind(undefined, 'GET', token),
        post: request.bind(undefined, 'POST', token),
        put: request.bind(undefined, 'PUT', token),
        patch: request.bind(undefined, 'PATCH', token),
        delete: request.bind(undefined, 'DELETE', token),
    }
};