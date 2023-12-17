import React, { useState, useRef, useCallback, useEffect } from 'react';
import { User } from '@/utils/interfaces';
import SliderWrapper from '../slider/SliderWrapper';
import { postRequest } from '@/services/httpService';
type FieldValues = {
  [key: string]: any;
};

export default function Form(props: any) {
  const fieldsValuesRef = useRef<FieldValues>({});
  const [addedUsersList, setAddedUsersList] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true,
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files && e.target.files[0];
      if (file) {
        fieldsValuesRef.current = {
          ...fieldsValuesRef.current,
          [name]: file,
        };
      }
    } else {
      const value = e.target.value;
      fieldsValuesRef.current = {
        ...fieldsValuesRef.current,
        [name]: value,
      };
    }
  };
  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        const file = fieldsValuesRef.current.workspace_logo;
        const formData = new FormData();
        formData.append('logo', file);

        formData.append('name', fieldsValuesRef.current.workspace_name);
        formData.append('users', JSON.stringify(addedUsersList));

        postRequest(formData).then((res) => {
          if (res) {
            setMessage('Workspace Successfully Added');
            setTimeout(() => {
              props.close();
            }, 2000);
            props.addWorkspaceToList(res)
          }
        });
      } catch (error: any) {
        console.log(error);
        setMessage(error.message);
      }
    },
    [addedUsersList]);


  const addUser = () => {
    if (userName && userEmail) {
      const newUser: User = {
        id: `${Date.now() + Math.round(5)}`,
        name: userName as string,
        email: userEmail as string,
      };
      setAddedUsersList([...addedUsersList, newUser]);
      // Clear input fields after adding user
      setUserName('');
      setUserEmail('');
    } else {
      console.error('Incomplete user data');
    }
  };

  const removeUser = (userId: string) => {
    const updatedUsers = addedUsersList.filter((user) => user.id !== userId);
    setAddedUsersList(updatedUsers);
  }

  useEffect(() => {
  }, [addedUsersList, message])
  return (
    <>
      {
        message.length > 0 ? (
          <div className="h-full flex items-center justify-center flex-1 min-h-[300px] mt-auto">
            <h3 className="font-Poppins-Bold text-l text-gray-900">{message}</h3>
          </div>
        ) : (
          <form id='form_element' onSubmit={handleSubmit}>
            <div className={`bg-white px-8 py-4 rounded`}>
              <legend className='font-Poppins-Medium text-xl'>Workspace Details</legend>
              <div className="form_field_item my-4 w-full">
                <label className='block mb-2 font-Poppins-Medium text-m' htmlFor="workspace_name">Name</label>
                <input
                  className={` px-4 py-2 rounded border border-gray-200 text-m w-full font-Regular`}
                  type="text" id="workspace_name" name="workspace_name" required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form_field_item mt-4">
                <label className='block mb-2 font-Poppins-Medium text-m' htmlFor="workspace_logo">Logo</label>
                <div className="relative h-32">
                  <input
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    type="file"
                    id="workspace_logo"
                    name="workspace_logo"
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="workspace_logo"
                    className="px-4 py-2 rounded border border-gray-200 text-m cursor-pointer w-full h-full flex items-center justify-center"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </div>

            <div className={` bg-white px-8 py-4 mt-6 rounded`}>
              {addedUsersList.length > 0 ? (
                <SliderWrapper settings={settings}>
                  {addedUsersList.map((user) => (
                    <div
                      key={user.id}
                      className={`px-4 py-2 mb-4 font-Poppins-Medium border-gray-300 text-m w-full bg-gray-100`}
                    >
                      <div className='flex justify-between items-center'>
                        <div className={``}>
                          <p className='mb-2 font-Poppins-Bold text-m'>{user.name}</p>
                          <p className='mb-2 font-Poppins-Regular text-m text-gray-500'>{user.email}</p>
                        </div>
                        <p
                          className='mb-2 font-Poppins-Bold text-m cursor-pointer'
                          onClick={() => removeUser(user.id)}
                        >Remove</p>
                      </div>
                    </div>
                  ))}
                </SliderWrapper>
              ) : ''
              }
              <legend className='font-Poppins-Regular text-xl mt-8'>Users</legend>
              <div className="form_field_item mt-4">
                <label className='block mb-2 font-Poppins-Medium text-m' htmlFor="user_name">Name</label>
                <input
                  className={` px-4 py-2 rounded border border-gray-200 text-m w-full font-Poppins-Regular text-m`}
                  type="text" id="user_name" name="user_name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
              <div className="form_field_item mt-4">
                <label className='block mb-2 font-Poppins-Medium text-m' htmlFor="user_email">Email</label>
                <input
                  className={` px-4 py-2 rounded border border-gray-200 text-m w-full font-Poppins-Regular text-m`}
                  type="email" id="user_email" name="user_email"
                  // onChange={(e) => handleChange(e)}
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                />
              </div>
              <div
                className="add_user_section mt-4 cursor-pointer"
                onClick={addUser}
              >
                <p className='font-Poppins-Medium'><span className='font-Poppins-Bold border-2 border-gray-900 rounded-full inline-block w-7 text-center mr-1'>+</span> Add another user</p>
              </div>
            </div>
            <div className={` flex mt-4 items-center justify-end gap-4`}>
              <input
                className={`font-Poppins-Medium cursor-pointer`}
                onClick={() => props.close()}
                type="reset" value="Cancel" />
              <input
                className={`font-Poppins-Medium rounded-lg bg-green-900 text-white px-4 py-2 text-center cursor-pointer`}
                type="submit" value="Submit Workspace" />
            </div>
          </form>
        )
      }
    </>
  )
}
