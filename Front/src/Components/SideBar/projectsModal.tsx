import { project } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import Project from "@/Components/SideBar/project.tsx";

const fetchProjects = async ():Promise<project[]> => {
    const res = await fetch('http://localhost:8080/projects');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};    
const ProjectsModal = ({setCurrentProject}: {setCurrentProject: React.Dispatch<React.SetStateAction<project | null>>}) => {

        const {data: projects, error,isLoading} = useQuery<project[],Error>({
            queryKey: ["projects"],
            queryFn: fetchProjects,
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="flex flex-col gap-2 h-full">
            {projects && projects.map((project: project) => (
                <div key={project.Id} 
                onClick={() => setCurrentProject(project)} 
                className="group flex flex-col gap-2 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer">
                    <Project project={project}/>
                </div>
            ))}

        </div>
    );
};

export default ProjectsModal;