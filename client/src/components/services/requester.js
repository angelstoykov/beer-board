export const requester = async (method, url) => {
    const response = await fetch(url, {
        method,
    });
    
    const result = await response.json();
    
    return result;
};