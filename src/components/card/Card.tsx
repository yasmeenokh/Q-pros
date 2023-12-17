import { useState } from 'react';
import SliderWrapper from '../slider/SliderWrapper';
import { updateRequest } from '@/services/httpService';

export default function Card(props: any) {
 const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
 const [editedUsers, setEditedUsers] = useState<{ [key: string]: any }>({});
 const [workSpace, setWorkspace] = useState(props.selectedWorkspace);
 const [successMessage, setSuccessMessage] = useState<string | boolean>(false)

 const handleEditClick = (userId: string) => {
  setEditMode({ ...editMode, [userId]: true });
  setEditedUsers({ ...editedUsers, [userId]: { ...workSpace.users.find((user: any) => user._id === userId) } });
 };

 const removeUser = async (userId: string) => {
  const id = workSpace?._id;
  const body = {
   users: workSpace.users.filter((user: any) => user._id !== userId),
  };
  await updateRequest(id, body);
  setWorkspace({
   ...props.selectedWorkspace,
   users: body.users,
  });
 }

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
  const { name, value } = e.target;
  setEditedUsers({
   ...editedUsers,
   [userId]: {
    ...editedUsers[userId],
    [name]: value,
   },
  });
 };

 const handleSaveClick = async (userId: string) => {
  const id = workSpace?._id;
  const body = {
   users: workSpace.users.map((user: any) => (user._id === userId ? editedUsers[userId] : user)),
  };
  await updateRequest(id, body);
  setEditMode({ ...editMode, [userId]: false });
 };

 const removeWorkspace = async (id: string) => {
  await props.removeWorkspace(id)
  setSuccessMessage('Workspace successful removed')

 }

 const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  rows: 2,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  lazyLoad: true,
 };

 return (
  <div className='mx-auto min-h-[250px] flex flex-col w-full items-center justify-center'>
   {
    successMessage ? <h4 className='font-bold text-center capitalize'>{successMessage}</h4> : (
     <>

      {workSpace?.users?.length > 0 ? (
       <SliderWrapper settings={settings}>
        {workSpace.users.map((user: any) => (
         <div
          key={user._id}
          className={`px-4 py-4 mb-4 mt-8 font-Poppins-Medium border-gray-300 text-m  md:max-w-full w-full bg-white rounded-lg`}
         >
          <div className='md:flex justify-between items-center max-w-full'>
           <div className='flex-col md:flex-row flex md:gap-8'>
            {editMode[user._id] ? (
             <>
              <input
               type='text'
               name='name'
               value={editMode[user._id] ? (editedUsers[user._id]?.name || '') : user.name}
               onChange={(e) => handleInputChange(e, user._id)}
               className='mb-2 font-Poppins-Bold text-m p-2'
              />
              <input
               type='text'
               name='email'
               value={editMode[user._id] ? (editedUsers[user._id]?.email || '') : user.email}
               onChange={(e) => handleInputChange(e, user._id)}
               className='mb-2 font-Poppins-Regular text-m text-gray-500 p-2 w-fit'
              />
             </>
            ) : (
             <>
              <p className='mb-2 font-Poppins-Bold text-m'>{user.name}</p>
              <p className='mb-2 font-Poppins-Regular text-m text-gray-500'>{user.email}</p>
             </>
            )}
           </div>
           <div className='flex gap-4 mt-6 md:mt-0 md:gap-3 justify-end'>
            <div
             className='cursor-pointer bg-green-900 text-white px-4 py-2 rounded font-Poppins-Regular text-sm'
             onClick={() => (editMode[user._id] ? handleSaveClick(user._id) : handleEditClick(user._id))}
            >
             {editMode[user._id] ? 'Save' : 'Edit'}
            </div>
            <div
             className='cursor-pointer bg-green-900 text-white px-4 py-2 rounded font-Poppins-Regular text-sm'
             onClick={() => removeUser(user._id)}
            >
             remove
            </div>
           </div>
          </div>
         </div>
        ))}
       </SliderWrapper>
      ) : (
       <h4 className='font-bold text-center capitalize mt-auto'>no users in the workspace</h4>
      )}
      <div
       className='mt-auto ml-auto cursor-pointer border border-green-900 text-green-900 px-4 py-2 rounded font-Poppins-Regular text-sm w-fit hover:text-white hover:bg-green-900'
       onClick={() => removeWorkspace(workSpace._id)}
      >
       Delete Workspace
      </div>
     </>
    )
   }

  </div>
 )
}
