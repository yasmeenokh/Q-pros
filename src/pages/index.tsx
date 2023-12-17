// import Image from 'next/image';
import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import { getRequest, deleteRequest } from '@/services/httpService';
import WorkSpaceList from '@/components/workSpace/WorkSpaceList';
import { WorkspacesArray, WorkspaceObject } from '@/utils/interfaces';
import Popup from '@/components/popup/Popup';
import Form from '@/components/form/Form';
import classes from '../styles/styles.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface HomeProps {
  workspaces: WorkspacesArray;
}

export default function Home({ workspaces }: HomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaceList, setWorkspaceList] = useState(workspaces)
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const removeWorkspace = async (id: string) => {
    setWorkspaceList(workspaceList.filter((item: any) => item._id !== id))
    await deleteRequest(id)
  }

  const addWorkspaceToList = (newWorkspace: any) => {
    setWorkspaceList([...workspaceList, newWorkspace]);
  };

  useEffect(() => {
  }, [workspaceList])
  return (
    <main className=''>
      <Header />
      <div className="workspace_wrapper p-4">
        <h1 className='text-4xl text-white font-Poppins-Bold mb-4'>Welcome Back!</h1>
        <p className='text-l text-white font-Poppins-Regular'>Choose your workspace to reach out of the box</p>
        <WorkSpaceList workSpaces={workspaceList} removeWorkspace={removeWorkspace} />
        <div className="create_workspace_wrapper text-right">
          <button
            className="create_workspace_btn text-l text-white font-Poppins-Regular mt-10 ml-auto cursor-pointer"
            onClick={togglePopup}
          >
            Create a new workspace
            <span className={`${classes.right_arrow} ml-2 align-middle inline-block`}></span>
          </button>
        </div>
        <Popup
          title='Create New Workspace'
          isOpen={isOpen}
          onClose={togglePopup}>
          <Form close={togglePopup} addWorkspaceToList={addWorkspaceToList} />
        </Popup>
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  try {
    let workspaces = await getRequest();
    return {
      props: {
        workspaces: workspaces
      }
    };
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching data');
  }
}