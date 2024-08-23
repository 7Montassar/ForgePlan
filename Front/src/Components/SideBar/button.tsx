import { MdAdd } from 'react-icons/md';
const Button = () => {
    return (
        <div className="flex justify-center items-center rounded-full h-10 w-10 hover:bg-zinc-800 cursor-pointer" >
            <MdAdd className="text-3xl text-white "/>
        </div>
    );
};

export default Button;