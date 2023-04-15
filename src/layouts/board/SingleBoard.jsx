import React from 'react';

import { getUser, getCards } from 'hooks/hooks';
import { useQueries, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from 'views/admin/dashboards/rtl/components/TaskCard';
import { getFilterLists } from 'hooks/hooks';
import { getFilterCards } from 'hooks/hooks';

const SingleBoard = () => {
  let { boardId } = useParams();
  const navigate = useNavigate();
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  const listQuery = useQuery({
    queryKey: ['lists', boardId],
    queryFn: () => getFilterLists(boardId),
  });
  const cardsQueryResults = useQueries(
    listQuery?.data?.map((list) => {
      return {
        queryKey: ['cards', list.$id],
        queryFn: () => getFilterCards(list.$id),
        enabled: listQuery.isSuccess,
      };
    }) || []
  );

  if (userQuery.status && listQuery.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (userQuery.status === 'error') {
    return navigate('/auth/sign-in/default');
  }

  if (userQuery.status && listQuery.status === 'error') {
    return <h1>{JSON.stringify(userQuery.error)}</h1>;
  }

  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] rounded-[20px] xl:flex-row">
      <div className="h-full w-full rounded-[20px]">
        {/* left side */}
        <div className="col-span-9 h-full w-full rounded-t-2xl xl:col-span-6">
          {/* overall & Balance */}
          <div className="mb-5 grid grid-cols-6 gap-5">
            <div className="col-span-6 h-full w-full rounded-xl 3xl:col-span-4">
              <div className="my-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-3 lg:grid-cols-3">
              {cardsQueryResults.map((cardsQueryResult, index) => {
                  const list = listQuery?.data[index];
                  const cards = cardsQueryResult.data;
                  return (
                    <TaskCard
                      user={userQuery.data}
                      key={list.$id}
                      cards={cards}
                      lid={list.$id}
                      title={list.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* line */}
      <div className="flex w-0 bg-gray-200 dark:bg-navy-700 xl:w-px" />
    </div>
  );
};

export default SingleBoard;
