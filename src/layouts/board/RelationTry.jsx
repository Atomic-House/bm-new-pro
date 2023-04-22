import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';

export default function RelationTry() {
  const client = new Client();

  client
    .setEndpoint('https://bm.atomichouse.co/v1')
    .setProject('644024c77289c7e6cbc4');

  const DB_ID = '64415eb6ac34bc0a9996';
  const WS_ID = '64415ec33e2564329aec';

  const databases = new Databases(client);

  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  useEffect(() => {
    databases
      .listDocuments(DB_ID, WS_ID)
      .then((data) => setWorkspaces(data.documents));
  }, []);

  const handleSelectWorkspace = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    console.log(workspaces, 'main');
  };

  return (
    <div>
      {workspaces[0]?.bS && <Board board={workspaces[0]?.bS} />}

      {workspaces[0]?.bS.map((item)=>item.title)}
      {workspaces.length > 0 && (
        <Dropdown
          workspaces={workspaces}
          onSelectWorkspace={handleSelectWorkspace}
        />
      )}

      {selectedWorkspaceId && (
        <WorkspaceComp workspaceId={selectedWorkspaceId} />
      )}

    </div>
  );
}

function Dropdown({ workspaces, onSelectWorkspace }) {
  const handleSelect = (event) => {
    onSelectWorkspace(event.target.value);
    console.log(event.target.value);
  };

  return (
    <select onChange={handleSelect}>
      {workspaces.map((workspace) => (
        <option key={workspace.$id} value={workspace.$id}>
          {workspace.$id}
        </option>
      ))}
    </select>
  );
}

function Workspace({ workspace }) {
  console.log('workspace component', workspace);
  return (
    <div>
      <h1>{workspace.title}</h1>
      {workspace.bS?.map((board) => (
        <Board key={board.$id} board={board} />
      ))}
    </div>
  );
}

function Board({ board }) {
  console.log(board, "board component")
  return (
    <div>
      <h2>{board?.title}</h2>
      {board?.lS?.map((list) => (
        <List key={list?.$id} list={list} />
      ))}
    </div>
  );
}

function List({ list }) {
  const client = new Client();

  client
    .setEndpoint('https://bm.atomichouse.co/v1')
    .setProject('644024c77289c7e6cbc4');

  const DB_ID = '64415eb6ac34bc0a9996';
  const CS_ID = '64415ed2d54470c01f7f';

  const databases = new Databases(client);

  const [csData, setCSData] = useState([]);

  useEffect(() => {
    databases
      .listDocuments(DB_ID, CS_ID)
      .then((data) => setCSData(data.documents));
  }, []);

  const filteredCards = csData?.filter((card) => card.lS.$id === list.$id);

  return (
    <div>
      <h3>{list.title}</h3>
      {console.log(filteredCards)}
      {filteredCards?.map((card) => (
        <>
          <div key={card.$id}>{card.title}</div>
        </>
      ))}
    </div>
  );
}

const WorkspaceComp = ({ workspaceId }) => {
  const client = new Client();

  client
    .setEndpoint('https://bm.atomichouse.co/v1')
    .setProject('644024c77289c7e6cbc4');

  const DB_ID = '64415eb6ac34bc0a9996';
  const WS_ID = '64415ec33e2564329aec';

  const databases = new Databases(client);

  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    databases
      .listDocuments(DB_ID, WS_ID)
      .then((data) => setWorkspace(data.documents));
    console.log(workspace, 'raj');
  }, [workspaceId]);

  return (
    <div>
      {workspace && <Workspace key={workspace.$id} workspace={workspace} />}
    </div>
  );
};

// const documents = [
//   {
//     $collectionId: '64415ec99997abcbc0c1',
//     $createdAt: '2023-04-20T15:53:29.978+00:00',
//     $databaseId: '64415eb6ac34bc0a9996',
//     $id: '64415ff9eeb88020738f',
//     $permissions: [],
//     $updatedAt: '2023-04-21T15:34:19.773+00:00',
//     title: 'Board1',
//     lS: [
//       {
//         $collectionId: '64415ece7bb6d4c4f985',
//         $createdAt: '2023-04-20T15:53:53.466+00:00',
//         $databaseId: '64415eb6ac34bc0a9996',
//         $id: '6441601171c8bbcac59e',
//         $permissions: [],
//         $updatedAt: '2023-04-21T15:34:19.779+00:00',
//         title: 'List 1',
//         cS: [
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card1',
//           },
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card2',
//           },
//         ],
//       },
//       {
//         $collectionId: '64415ece7bb6d4c4f985',
//         $createdAt: '2023-04-20T15:53:53.466+00:00',
//         $databaseId: '64415eb6ac34bc0a9996',
//         $id: '6441601171c8bbcac59e',
//         $permissions: [],
//         $updatedAt: '2023-04-21T15:34:19.779+00:00',
//         title: 'List 2',
//         cS: [
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card3',
//           },
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card4',
//           },
//         ],
//       },
//     ],
//     wS: {
//       $collectionId: '64415ec33e2564329aec',
//       $createdAt: '2023-04-20T15:52:23.520+00:00',
//       $databaseId: '64415eb6ac34bc0a9996',
//       $id: '64415fb77f0215bbcf2d',
//       $permissions: [],
//       $updatedAt: '2023-04-20T15:52:23.520+00:00',
//       title: 'workspace 1',
//     },
//   },
//   {
//     $collectionId: '64415ec99997abcbc0c1',
//     $createdAt: '2023-04-20T15:53:29.978+00:00',
//     $databaseId: '64415eb6ac34bc0a9996',
//     $id: '64415ff9eeb88020738f',
//     $permissions: [],
//     $updatedAt: '2023-04-21T15:34:19.773+00:00',
//     title: 'Board2',
//     lS: [
//       {
//         $collectionId: '64415ece7bb6d4c4f985',
//         $createdAt: '2023-04-20T15:53:53.466+00:00',
//         $databaseId: '64415eb6ac34bc0a9996',
//         $id: '6441601171c8bbcac59e',
//         $permissions: [],
//         $updatedAt: '2023-04-21T15:34:19.779+00:00',
//         title: 'List 3',
//         cS: [
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card1',
//           },
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card2',
//           },
//         ],
//       },
//       {
//         $collectionId: '64415ece7bb6d4c4f985',
//         $createdAt: '2023-04-20T15:53:53.466+00:00',
//         $databaseId: '64415eb6ac34bc0a9996',
//         $id: '6441601171c8bbcac59e',
//         $permissions: [],
//         $updatedAt: '2023-04-21T15:34:19.779+00:00',
//         title: 'List 4',
//         cS: [
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card3',
//           },
//           {
//             $collectionId: '64415ed2ssd54470c01f7f',
//             $createdAt: '2023-04-20T15:49:23.523+00:00',
//             $databaseId: '64415eb6ac34bc0a9996',
//             $id: '64415f037fcde694c265',
//             $permissions: ['read("any")'],
//             $updatedAt: '2023-04-20T15:54:16.855+00:00',
//             title: 'Card4',
//           },
//         ],
//       },
//     ],
//     wS: {
//       $collectionId: '64415ec33e2564329aec',
//       $createdAt: '2023-04-20T15:52:23.520+00:00',
//       $databaseId: '64415eb6ac34bc0a9996',
//       $id: '64415fb77f0215bbcf2d',
//       $permissions: [],
//       $updatedAt: '2023-04-20T15:52:23.520+00:00',
//       title: 'workspace 2',
//     },
//   },
// ];
