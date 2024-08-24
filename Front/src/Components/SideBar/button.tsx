import { MdAdd } from 'react-icons/md';
import { Link } from "react-router-dom";
const Button = () => {
    return (
        <Link to="/add">

        <div className="flex justify-center items-center rounded-full h-10 w-10 hover:bg-zinc-800 cursor-pointer"  >
            <MdAdd className="text-3xl text-white "/>
        </div>
        </Link>
    );
};

export default Button;