import {Client, Account, Databases} from 'appwrite'

export const client = new Client()
    .setEndpoint('https://bm.atomichouse.co/v1')
    .setProject('64117d094f4890634c2d');

export const account = new Account(client);
export const id = new Account(client);
export const databases = new Databases( client);