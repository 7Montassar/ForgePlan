import SideBar from "./Components/SideBar/sidebar.tsx";
import { useState } from "react";
import { project } from "@/types/project.ts";
import ProjectCard from "./Components/Project/ProjectCard.tsx";

function App() {
  const [currentProject, setCurrentProject] = useState<project | null>(null);
 
  return (
    <div >
      <SideBar setCurrentProject={setCurrentProject}/>
      {currentProject && <ProjectCard Project={currentProject}/>}
    </div>
  );
}

export default App;