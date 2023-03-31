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
        console.log(`getBoardById`, id);
        const board = await request.get(`${baseUrl}/${id}`);
    
        return board;
    }

    return {
        getAll,
        getBoardById
    };
}