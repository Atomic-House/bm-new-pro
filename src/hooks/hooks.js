import { ID, Permission, Query, Role } from 'appwrite';
import { account, databases, id } from '../appwrite/appConfig';

const PROJECT_ID = '641f1b21bd099595d29a';
const LISTS_ID = '641f1be970ce133dfc0e';
const CARD_ID = '641f1c0d4111fceddcc2';
const BOARD_ID = '641f1b9f910470b57a64';

export async function getBoard() {
  const result = await databases.listDocuments(PROJECT_ID, BOARD_ID);
  return result.documents;
}

export async function getLists() {
  const result = await databases.listDocuments(PROJECT_ID, LISTS_ID);
  return result.documents;
}

export async function getFilterLists(boardId) {
  const result = await databases.listDocuments(PROJECT_ID, LISTS_ID, [Query.equal('bid', boardId)]);
  return result.documents;
}

export async function getFilterCards(listID) {
  const result = await databases.listDocuments(PROJECT_ID, CARD_ID, [Query.equal('lid', listID)]);
  return result.documents;
}

export async function getCards() {
  const result = await databases.listDocuments(PROJECT_ID, CARD_ID);
  return result.documents;
}

export async function delCards(id) {
  const result = await databases.deleteDocument(PROJECT_ID, CARD_ID, id);
  return result.documents;
}

export async function getUser() {
  const result = await account.get();
  return result;
}
