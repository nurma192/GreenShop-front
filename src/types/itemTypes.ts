import {ItemsUser} from "./userTypes";

export type ItemType = 'lost' | 'found'

// export interface Item {
//     id: string;
//     name: string;
//     images: string[];
//     user: string;
//     category: {
//         id: string;
//         name: string;
//     },
//     createdAt: string;
//     updatedAt: string;
//     lostDate: string;
//     foundDate: string;
// }

export interface FoundItem {
    id: string,
    name: string,
    description: string,
    images: string[],
    user: {
        id: string,
        email: string,
        telegram: string,
        phone: string,
    },
    category: {
        id: string,
        name: string,
    },
    foundDate: string,
    createdAt: string,
    updatedAt: string,
}
export interface LostItem {
    id: string,
    name: string,
    description: string,
    images: string[],
    user: ItemsUser
    category: {
        id: string,
        name: string,
    },
    lostDate: string,
    createdAt: string,
    updatedAt: string,
}