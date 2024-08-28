import ImageSelect from "@/Components/Project/ImageSelect";
import ProjectForm from "@/Components/Project/ProjectForm";
import { project } from "@/types/Project";
import { useState } from "react";

const AddProject = () => {
  const [phase, setPhase] = useState<number>(1);
  const [project, setProject] = useState<project | null>(null);


    return (
    <div className="flex flex-col gap-10 px-14 py-10">
      <h1 className="text-3xl text-white text-center">Add Project</h1>
      <div className="flex h-2 px-16 justify-between">
        <div
          className={`w-[48%]  rounded-md ${
            phase === 1 ? "bg-white" : "bg-zinc-600"
          }`}
        />
        <div
          className={`w-[48%]  rounded-md ${
            phase === 2 ? "bg-white" : "bg-zinc-600"
          }`}
        />
      </div>
      {phase === 1 && (
        <ProjectForm setProject={setProject} setPhase={setPhase} />
      )}
      {phase === 2 && (
        <ImageSelect project={project as project} />
      )}
    </div>
    );
};

export default AddProject;
