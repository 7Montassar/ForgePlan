import { useRef, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({children, close}: {children: React.ReactNode, close: () => void}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      window.location.reload();
      close();
      }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-opacity-40 bg-black w-screen h-screen fixed top-0 left-0" />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-[90%]"
        ref={modalRef}
      > 
        <div className="bg-zinc-900 w-full h-full rounded-lg">
          <button 
            className="absolute top-3 right-3 text-white text-3xl cursor-pointer" 
            onClick={close}
          >
            <IoMdCloseCircle className="text-white text-3xl" />
          </button>
          <div className="max-h-full overflow-hidden hover:overflow-y-auto scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-400">
          {children}
          </div>
        </div>  
      </div>
    </>
  )
}

export default Modal;
