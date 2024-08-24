import SideBar from "./Components/SideBar/sidebar.tsx";
import { useState } from "react";
import { project } from "@/types/Project.ts";
import ProjectCard from "./Components/Project/ProjectCard.tsx";

function App() {
  const [currentProject, setCurrentProject] = useState<project | null>(null);
 
  return (
    <div className="flex  h-screen ">
      <SideBar setCurrentProject={setCurrentProject}/>
      {currentProject && <ProjectCard Project={currentProject}/>}
    </div>
  );
}

export default App;