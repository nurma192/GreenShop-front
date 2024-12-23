import {Role} from "../Roles";

export interface RegisterResponse {
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string,
    "role": Role
}