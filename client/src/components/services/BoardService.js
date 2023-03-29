import { request } from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/boards';

export const getAll = async () => {
    const boards = await request('GET', baseUrl);
    
    const result = Object.values(boards);

    return result;
}

export const getBoardById = async (id) => {
    const board = await request('GET', `${baseUrl}/${id}`);

    return board;
}