import { collaborator, task } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchCollaborators = async (id: number): Promise<collaborator[]> => {
  const res = await fetch(`http://localhost:8080/projects/${id}/tasks`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
const Tasks = () => {
  const { id } = useParams<{id : string}>();  
  const projectId = id ? parseInt(id,10) : 0;
  const {
    data: collaborators,
    error,
    isLoading,
  } = useQuery<collaborator[], Error>({
    queryKey: ["collaborators", id],
    queryFn: () => fetchCollaborators(projectId),
    enabled: !!id,
    
  });
  if (isLoading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-black" >Error: {error.message}</div>;
  return (
    <div className="flex felx-col gap-8 h-full">
      {collaborators ? collaborators.map((collaborator: collaborator) => (
        <div className="flex flex-col gap-2 text-white w-[30%] text-center bg-zinc-800">
          <div key={collaborator.Id} className="bg-zinc-600 rounded-b-md p-2 ">
            <p className="text-lg font-bold">{collaborator.Name}</p>
          </div>
          <div className="flex flex-col gap-1">
            {collaborator.Tasks.map((task: task)=>(
              <div key={task.Id} className="bg-zinc-700 p-2 flex justify-around"> 
                <p className="text-lg font-semibold">{task.Title}</p>
                <input type="checkbox" checked={task.Completed} />
              </div>
            ))}
          </div>
        </div>
      )): <div>No collaborators found</div>
    }
    </div>
  );
};

export default Tasks;
