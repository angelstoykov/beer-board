import { requester } from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/boards';

export const getAll = async () => {
    const boards = await requester('GET', baseUrl);
    
    const result = Object.values(boards);

    return result;
}

export const getBoardById = async (id) => {
    const board = await requester('GET', `${baseUrl}/${id}`);

    return board;
}