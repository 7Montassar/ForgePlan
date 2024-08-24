import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import AddProject from "./pages/AddProject";
import Project from "./pages/Project";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddProject />} />
          <Route path="projects/:id" element={<Project />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
