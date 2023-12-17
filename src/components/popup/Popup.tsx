import { ReactNode } from 'react';
import Image from 'next/image';
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string
  logo?: any
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children, logo }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`relative bg-gray-100 p-4 lg:p-8 rounded shadow-lg flex flex-col w-[90%] max-h-[95%] xl:w-[60%] lg:max-h-[70%]`}>
        <button className="absolute top-6 right-6 px-2 py-1 font-Poppins-Bold text-2xl" onClick={onClose}>
          X
        </button>
        <div className='flex gap-5 items-center'>
          {logo ? (
            <div className='relative w-10 h-10 md:w-14 md:h-14'>
              <Image
                src={logo}
                alt={title}
                fill
              />
            </div>
          )
            : ""}
          <h3 className='font-Poppins-Bold my-4 text-lg md:text-3xl capitalize'>{title}</h3>
        </div>
        <div className='max-h-[100%] max-w-[100%] overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
