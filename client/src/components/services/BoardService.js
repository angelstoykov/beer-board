import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/boards';

export const boardServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const boards = await request.get(baseUrl);
        
        const result = Object.values(boards);
    
        return result;
    }
    
    const getBoardById = async (id) => {
        const board = await request.get(`${baseUrl}/${id}`);
    
        return board;
    }

    const create = async (payload) => {
        const result = await request.post(baseUrl, payload);
    
        return result;
    };

    const deleteBoard = (id) => request.delete(`${baseUrl}/${id}`);

    const editBoard = (id, data) => request.put(`${baseUrl}/${id}`, data);

    return {
        getAll,
        getBoardById,
        delete: deleteBoard,
        create,
        edit: editBoard,
    };
}