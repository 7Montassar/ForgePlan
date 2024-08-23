import SearchBar from "@/Components/SideBar/searchBar";
import Button from "@/Components/SideBar/button.tsx";
import { GoProjectRoadmap } from "react-icons/go";
import ProjectsModal from "@/Components/SideBar/projectsModal.tsx";
import { project } from "@/types/project";


const SideBar = ({setCurrentProject}: {setCurrentProject: React.Dispatch<React.SetStateAction<project | null>>}) => {
    return (
        <div className="bg-zinc-900 w-[30%]  h-screen">
            <div className="flex flex-col h-full gap-4 p-4">
             <div className="flex flex-col gap-2">
             <div className="flex  justify-between ">
               <div className="flex items-center gap-1">
                  <GoProjectRoadmap className="text-3xl text-white"/>
                   <h1 className="text-2xl text-white font-bold">GoPlan</h1>
               </div>
            <Button/>
            </div>
            <SearchBar/>
             </div>
             <div className="overflow-hidden hover:overflow-y-scroll scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-400">
             <ProjectsModal setCurrentProject={setCurrentProject}/>
             </div>
            </div>
        </div>
    );
};

export default SideBar;