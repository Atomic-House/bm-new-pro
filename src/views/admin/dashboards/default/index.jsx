import React from 'react';
import Balance from './components/Balance';
import DailyTraffic from './components/DailyTraffic';
import MostVisited from './components/MostVisited';
import OverallRevenue from './components/OverallRevenue';
import ProfitEstimation from './components/ProfitEstimation';
import ProjectStatus from './components/ProjectStatus';
import YourCard from './components/YourCard';
import YourTransfers from './components/YourTransfers';

import { tableColumnsMostVisited } from './variables/tableColumnsMostVisited';
import tableDataMostVisited from './variables/tableDataMostVisited';
import TaskCard from '../rtl/components/TaskCard';

import { getUser, getLists, getCards } from 'hooks/hooks';
import { useQuery } from 'react-query';

const Dashboard = () => {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  const listQuery = useQuery({
    queryKey: ['lists'],
    queryFn: getLists,
  });
  const cardsQuery = useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  });

  if (userQuery.status && listQuery.status && cardsQuery.status === 'loading')
    return <h1>Loading...</h1>;
  if (userQuery.status && listQuery.status && cardsQuery.status === 'error') {
    return <h1>{JSON.stringify(userQuery.error)}</h1>;
  }

  return (
   
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] rounded-[20px] xl:flex-row">
       {console.log(listQuery)}
      <div className="h-full w-full rounded-[20px]">
        {/* left side */}
        <div className="col-span-9 h-full w-full rounded-t-2xl xl:col-span-6">
          {/* overall & Balance */}
          <div className="mb-5 grid grid-cols-6 gap-5">
            <div className="col-span-6 h-full w-full rounded-xl 3xl:col-span-4">
              <div className="my-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-3 lg:grid-cols-3">
                {listQuery?.data?.map((item, index) => {
                  const anyKeyFilter = (e) => (obj) =>
                    Object.values(obj).includes(e);
                  const filteredBoards = cardsQuery?.data?.filter(
                    anyKeyFilter(item.$id)
                  );
                  return (
                    <TaskCard
                      key={index}
                      cards={filteredBoards}
                      lid={item.$lid}
                      title={item.title}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-span-6 w-full 3xl:col-span-2">
              <Balance />
            </div>
          </div>
          {/* Daily Traffic and.. */}
          <div className="mt-5 grid w-full grid-cols-6 gap-5">
            <div className="col-span-6 md:col-span-3 3xl:col-span-2">
              <DailyTraffic />
            </div>
            <div className="col-span-6 md:col-span-3 3xl:col-span-2">
              <ProjectStatus />
            </div>
            <div className="col-span-6 3xl:col-span-2">
              <ProfitEstimation />
            </div>
          </div>
          {/* Your Transfers & tables */}
          <div className="mt-5 grid w-full grid-cols-6 gap-5">
            <div className="col-span-6 3xl:col-span-2">
              <YourTransfers />
            </div>
            <div className="col-span-6 3xl:col-span-4">
              <MostVisited
                tableData={tableDataMostVisited}
                columnsData={tableColumnsMostVisited}
              />
            </div>
          </div>
        </div>
      </div>

      {/* line */}
      <div className="flex w-0 bg-gray-200 dark:bg-navy-700 xl:w-px" />

      {/* right section */}
      <div className="h-full w-full xl:w-[400px] xl:min-w-[300px] 2xl:min-w-[400px]">
        <YourCard />
      </div>
    </div>
  );
};

export default Dashboard;
