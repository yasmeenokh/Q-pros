import React, { useState } from 'react';
import Image from 'next/image';
import { WorkspaceObject, WorkspacesArray } from '@/utils/interfaces';
import { getImageType } from '@/utils/modules';
import classes from './styles.module.scss';
import Popup from '../popup/Popup';
import Card from '../card/Card';
interface WorkSpaceListProps {
  workSpaces: WorkspacesArray;
  removeWorkspace: Function;
}

export default function WorkSpaceList({ workSpaces, removeWorkspace }: WorkSpaceListProps) {
  const [workSpaceList, setWorkSpaceList] = useState(workSpaces);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkspace, setWorkspace] = useState<WorkspaceObject | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${classes.workspace_list_wrapper}`}>
      <div className={`${classes.workspace_list_container} w-full md:w-[650px] bg-white rounded-md mt-8`}>
        <p className='py-6 px-4 bg-gray-100 rounded-md font-Poppins-Regular text-base'>Workspace for xxxx@mail.com</p>
        <div className="list_wrapper">
          {workSpaces.map((workSpace: WorkspaceObject, index: number) => (
            <div
              key={`${index}-${workSpace._id}`}
              className={`${classes.workspace_item} flex gap-2 md:gap-4 items-center px-4 py-6 border-b border-gray-200 cursor-pointer`}
              onClick={() => {
                togglePopup();
                setWorkspace(workSpace)
              }}
            >
              <div className='relative w-10 h-10 md:w-14 md:h-14'>
                <Image
                  src={workSpace.logo ? `data:image/${getImageType(workSpace?.logo)};base64,${workSpace?.logo}` : '/assets/images/placeholder.png'}
                  alt='test'
                  fill
                  className='max-w-full max-h-full'
                />
              </div>
              <h2 className={` capitalize font-Poppins-Medium text-lg md:text-2xl text-black`}>{workSpace.name}</h2>
              <div className="bg-green-900 text-white px-4 py-2 rounded ml-auto font-Poppins-Regular text-sm">{workSpace.users.length} users</div>
            </div>
          ))}
        </div>
      </div>
      <Popup title={`${selectedWorkspace?.name}`}
        logo={selectedWorkspace?.logo ? `data:image/${getImageType(selectedWorkspace?.logo)};base64,${selectedWorkspace?.logo}` : ''}
        isOpen={isOpen} onClose={togglePopup}>{
          <Card selectedWorkspace={selectedWorkspace} removeWorkspace={removeWorkspace} />
        }</Popup>
    </div>
  )
}
