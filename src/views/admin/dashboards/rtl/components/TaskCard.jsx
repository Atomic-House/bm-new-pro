import CardMenu from 'components/card/CardMenu';
import React, { useState } from 'react';
import Checkbox from 'components/checkbox';
import { MdCheckCircle, MdOutlineEditRoad } from 'react-icons/md';
import Card from 'components/card';
import ModalCustom from 'components/modal/ModalCustom';

const TaskCard = ({ cards, user, title, lid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nData, setNdata] = useState({});

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setNdata('');
    setIsOpen(true);
  };
  const handleUpdateOpen = (newData) => {
    setNdata(newData);
    setIsOpen(true);
  };
  return (
    <>
      <Card extra="pb-7 p-[20px]">
        {/* task header */}
        <div className="relative flex flex-row justify-between">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
              <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
            </div>
            <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
              {title}
            </h4>
          </div>

          <CardMenu onOpen={handleOpen} />
        </div>

        {/* task content */}

        {cards?.map((item) => (
          <div className="h-full w-full" key={item.$id}>
            <div className="mt-5 flex items-center justify-between p-2">
              <div className="flex items-center justify-center gap-2">
                <Checkbox />
                <div>
                  <p className="text-base font-bold text-navy-700 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs font-bold text-navy-700 dark:text-white">
                    {item.url.slice(0, 20)}...
                  </p>
                </div>
              </div>
              <div>
                <button onClick={() => handleUpdateOpen(item)}>
                  <MdOutlineEditRoad className="h-6 w-6 text-navy-700 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Card>
      {isOpen && (
        <ModalCustom
          lid={lid}
          onClose={handleClose}
          isOpen={isOpen}
          user={user}
          nData={nData}
        />
      )}
    </>
  );
};

export default TaskCard;
