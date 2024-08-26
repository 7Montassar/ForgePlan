import SearchBar from "@/Components/SideBar/searchBar";
import Button from "@/Components/SideBar/button.tsx";
import { GoProjectRoadmap } from "react-icons/go";
import ProjectsModal from "@/Components/SideBar/projectsModal.tsx";
import Modal from "../Modal/Modal";
import AddProject from "@/pages/AddProject";
import { useState } from "react";


const SideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
        <div className="bg-zinc-900 w-[35%] 2xl:w-[25%]  h-screen">
            <div className="flex flex-col h-full gap-4 p-4">
             <div className="flex flex-col gap-2">
             <div className="flex  justify-between ">
               <div className="flex items-center gap-1">
                  <GoProjectRoadmap className="text-3xl text-white"/>
                   <h1 className="text-2xl text-white font-bold">ForgePlan</h1>
               </div>
            <Button onClick={openModal}/>
            </div>
            <SearchBar/>
             </div>
             <div className="overflow-hidden hover:overflow-y-auto scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-400">
             <ProjectsModal />
             </div>
            </div>
        </div>
        {
            isModalOpen &&
            <Modal close={closeModal}>
                <AddProject />
            </Modal>
        }
        </>
    );
};

export default SideBar;