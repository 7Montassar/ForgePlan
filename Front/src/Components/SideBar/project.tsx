import { project } from "@/types/project";
const Project = ({ project }: { project: project }) => {
  return (
    <div className="flex gap-2 items-center text-white hover:bg-zinc-800 cursor-pointer">
      <div className="w-16 h-16 rounded-md bg-zinc-800 flex justify-center items-center">
        <img src={project.Image} alt={project.Name} className="w-16 h-16" />
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xl font-bold">{project.Name}</h1>
        <p className="text-gray-300">
          Deadline :{" "}
          {Math.ceil(
            (new Date(project.Deadline).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )}{" "}
          days
        </p>
      </div>
    </div>
  );
};

export default Project;