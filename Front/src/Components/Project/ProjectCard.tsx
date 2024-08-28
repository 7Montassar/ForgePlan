import { project } from "@/types/Project";
import NavMenu from "./NavMenu";
import { useState } from "react";
import { Tab } from "@/types/Project";
import Tasks from "@/Components/Project/Tasks/Tasks";
const ProjectCard = ({ Project }: { Project: project }) => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.TASKS);
  return (
    <div className="w-[65%] md:w-[70%] xl:w-[75%]  h-full bg-zinc-950 flex flex-col">
      <div className="h-[18%] bg-zinc-300" />
      <div className="flex gap-4">
        <div className="h-28 w-28 bg-zinc-900 rounded-md flex -mt-12 ml-14">
          <img src={Project.Image} alt={Project.Name} className=" " />
        </div>
        <div className="flex flex-col gap-4 -mt-10">
          <h1 className="text-zinc-800 text-2xl font-bold">{Project.Name}</h1>
          <h1 className="text-zinc-200 text-2xl font-bold">{`Due : ${new Date(
            Project.Deadline
          ).toLocaleDateString()}`}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-12 px-16 py-12 h-full">
        <NavMenu setCurrentTab={setCurrentTab} />
        {currentTab === Tab.PDF && (
          <object
            className="m-auto"
            width="80%"
            height="100%"
            data="https://online.flippingbook.com/view/774438281/"
            type="application/pdf"
          />
        )}
        {currentTab === Tab.TASKS && <Tasks />}
      </div>
    </div>
  );
};

export default ProjectCard;
