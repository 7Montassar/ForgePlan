import ProjectCard from "@/Components/Project/ProjectCard";
import { project } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchProject = async (id: string): Promise<project> => {
  const res = await fetch(`http://localhost:8080/projects/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }
  return res.json();
};

const Project = () => {
  const { id } = useParams();

  // Early return if id is undefined
  if (!id) {
    return <div>Error: Project ID is missing</div>;
  }

  const { data: currentProject, error, isLoading } = useQuery<project, Error>({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {currentProject ? (
        <ProjectCard Project={currentProject} />
      ) : (
        <div>No project found</div>
      )}
    </>
  );
};

export default Project;
