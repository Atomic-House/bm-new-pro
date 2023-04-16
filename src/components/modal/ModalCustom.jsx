import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { ID, Permission, Role } from 'appwrite';
import { databases} from '../../appwrite/appConfig';

const ModalCustom = ({ isOpen, onClose, lid, nData, user }) => {
  const handleClose = () => {
    onClose();
  };

  const [data, setData] = useState({
    title: nData.title || '',
    url: nData.url || '',
    icon: nData.icon || '',
    note: nData.note || '',
    tags: nData.tags || '',
  });

  const queryClient = useQueryClient();

  const addDocument = useMutation(
    (documentData) =>
      databases.createDocument(
        '641f1b21bd099595d29a',
        '641f1c0d4111fceddcc2',
        ID.unique(),
        {
          ...documentData,
          lid: lid,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      ),
    {
      onSuccess: () => {
        setData({});
        handleClose();
        queryClient.invalidateQueries('cards');
      },
      onError: (error) => {
        console.log(error); // Failure
      },
    }
  );

  const updateDocument = useMutation(
    (documentData) =>
      databases.updateDocument(
        nData.$databaseId,
        nData.$collectionId,
        nData.$id,
        documentData
      ),
    {
      onSuccess: () => {
        setData({});
        handleClose();
        queryClient.invalidateQueries('cards');
      },
      onError: (error) => {
        console.log(error); // Failure
      },
    }
  );

  const handlerAdd = () => {
    if (data.title === '') return alert('Input Field cannot be empty');
    if (nData?.lid) {
      updateDocument.mutate({
        title: data.title,
        url: data.url,
        icon: data.icon,
        note: data.note,
        tags: data.tags,
      });
    } else {
      addDocument.mutate({
        title: data.title,
        url: data.url,
        icon: data.icon,
        note: data.note,
        tags: data.tags,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add bookmark</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <form
                noValidate=""
                action=""
                className="ng-untouched ng-pristine ng-valid container mx-auto flex flex-col space-y-12"
              >
                <fieldset className="rounded-md p-3 shadow-sm dark:bg-gray-900">
                  <div className=" flex w-full flex-col items-center justify-start gap-2">
                    <div className="">
                      <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        required
                        value={data.title || ''}
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        id="url"
                        type="text"
                        placeholder="URL"
                        value={data.url || ''}
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, url: e.target.value })
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        id="icon"
                        type="text"
                        value={data.icon || ''}
                        placeholder="Icon URL"
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, icon: e.target.value })
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        id="note"
                        type="text"
                        placeholder="Notes"
                        value={data.note || ''}
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, note: e.target.value })
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        id="tags"
                        type="text"
                        value={data.tags || ''}
                        placeholder="Tags add comma's"
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, tags: e.target.value })
                        }
                      />
                    </div>
                    <div className="">
                      <input
                        id="datetime"
                        type="datetime-local"
                        value={data.duedate || ''}
                        placeholder="Due Date"
                        className="w-full rounded-md focus:ring focus:ring-teal-400 focus:ring-opacity-75 dark:border-gray-700 dark:text-gray-900"
                        onChange={(e) =>
                          setData({ ...data, duedate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlerAdd}>
              Add
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCustom;
