import CardMenu from 'components/card/CardMenu';
import React from 'react';
import Checkbox from 'components/checkbox';
import { MdDragIndicator, MdCheckCircle } from 'react-icons/md';
import Card from 'components/card';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';

const TaskCard = ({ cards, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const BasicUsage = () => {
  //   return (
    
  //   );
  // };

  return (
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
        <button onClick={onOpen}>Add</button>

        <CardMenu />
      </div>

      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>hello</ModalBody>
            <ModalFooter>Hello</ModalFooter>
          </ModalContent>
        </Modal>
      </>

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
              <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default TaskCard;
