import { Query } from "appwrite";
import { account, databases, id } from "../appwrite/appConfig";

export const projectID = "641f1b21bd099595d29a";
export const listsID = "641f1be970ce133dfc0e";
export const cardID ="641f1c0d4111fceddcc2";
export const boardID="641f1b9f910470b57a64";

export function getBoard() {
  return databases
    .listDocuments(projectID, boardID)
    .then((res) => res.documents);
}

export function getLists() {
  return databases
    .listDocuments(projectID, listsID)
    .then((res) => res.documents);
}
export function getFilterLists(boardId) {
  return databases
    .listDocuments(projectID, listsID,
      [
          Query.equal('bid', boardId)
      ])
    .then((res) => res.documents);
}

export function getCards() {
    return databases
      .listDocuments(projectID, cardID)
      .then((res) => res.documents);
  }

  

export function getUser() {
  return account.get();
}
