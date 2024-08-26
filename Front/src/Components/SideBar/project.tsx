import { project } from "@/types/Project";
import { useEffect, useState } from "react";
const Project = ({ project }: { project: project }) => {
  const [deadline, setDeadline] = useState<number>(0);
  useEffect(() => {
    setDeadline(
      Math.ceil(
        (new Date(project.Deadline).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [project]);
  return (
    <div className="flex gap-2 items-center ">
      <div className="w-16 h-16 rounded-md group-hover:bg-zinc-900 bg-zinc-800 flex justify-center items-center">

      <img src={project.Image} alt={project.Name} className="w-14 h-14" /> 
      </div>
      <div className="flex flex-col ">
        <h1 className="text-lg font-bold text-white">{project.Name}</h1>
        <p className={`${deadline > 7 ? "text-gray-400" : "text-red-400"} text-sm`}>
          Deadline : {deadline} days
        </p>
      </div>
    </div>
  );
};

export default Project;