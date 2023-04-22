/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import {
  renderThumb,
  renderTrack,
  renderView,
} from 'components/scrollbar/Scrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import routes from 'routes.js';
import Card from 'components/card';
import { MdSpaceDashboard } from 'react-icons/md';
import { useQuery } from 'react-query';
import SingleBoard from 'layouts/board/SingleBoard';
import { getWorkspace } from 'hooks/hooks';
import { useState } from 'react';

const SidebarHorizon = ({ open, onClose, variant }) => {

  const workspaceQuery = useQuery({
    queryKey: ['workspace'],
    queryFn: getWorkspace,
  });

  // check if the data is available before accessing it
  if (workspaceQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (workspaceQuery.isError) {
    return <div>Error: {workspaceQuery.error.message}</div>;
  }

  const data = workspaceQuery.data || [];

  const workspaces = data.map((subitem) => ({
    id: subitem.$id,
    title: subitem.title,
  }));

  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0].id);

  const handleWorkspaceChange = (event) => {
    setSelectedWorkspace(event.target.value);
  };

  const boards = data
    .find((workspace) => workspace.$id === selectedWorkspace)
    ?.bS.map((board) => ({
      name: board.title,
      layout: '/board',
      path: `/${board.$id}`,
      component: <SingleBoard />,
      secondary: true,
    }));


  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === 'auth' ? 'xl:hidden' : 'xl:block'
      } ${open ? '' : '-translate-x-full'}`}
    >
      <Card
        extra={`w-[285px] ml-3 sm:mr-4 sm:my-4 h-[96.5vh] m-7 !rounded-[20px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute right-4 top-4 block cursor-pointer xl:hidden"
                onClick={onClose}
              >
                <HiX />
              </span>
              <div className={`ml-[52px] mt-[44px] flex items-center `}>
                <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                  Atomic <span className="font-medium">House</span>
                </div>
              </div>
              <div className="mb-7 mt-[58px] h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}

              <ul className="ml-[10px] pt-1">
                {workspaceQuery.isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <Links
                    routes={[
                      {
                        name: 'Boards',
                        path: '/board',
                        icon: (
                          <MdSpaceDashboard className="text-inherit h-5 w-5" />
                        ),
                        collapse: true,
                        items: boards,
                      },
                    ]}
                  />
                )}
              </ul>

              <div className="ml-[10px] flex w-36 flex-col pt-1">
                <div>
                  <div className="align-center flex w-full justify-center">
                    <div className="flex items-center justify-center pr-3">
                      <MdSpaceDashboard className="text-inherit h-5 w-5" />
                    </div>
                    <p className="mr-auto font-medium text-gray-600">
                      Worksapce
                    </p>
                  </div>
                </div>
                <select
                  className="block w-full rounded-md px-4 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="workspace-select"
                  value={selectedWorkspace}
                  onChange={handleWorkspaceChange}
                >
                  {workspaces.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.title}
                    </option>
                  ))}
                </select>
              </div>
             
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
};

export default SidebarHorizon;
