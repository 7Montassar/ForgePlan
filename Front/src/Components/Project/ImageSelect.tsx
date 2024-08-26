import { project } from "@/types/Project";
import FloatingLabelInput from "../FloatingLabelInput";
import { MdDone } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageSelect = ({
  project,
}: {
  project: project;
}) => {
  const [newImage, setNewImage] = useState<string>(project.Image);
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    if (newImage !== project.Image) {
    try{
      const res = await fetch("http://localhost:8080/updateProjectImage", {
        method: "POST",
        body: JSON.stringify({
          projectId: project.Id,
          image: newImage,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    }
  catch(err){
    console.log(err);
  }
}
Navigate('/projects/' + project.Id);
window.location.reload();
};
  return (
    <div className="flex flex-col gap-8">
      <p className="text-zinc-300 text-center text-lg whitespace-pre-line">{
       ` We've choosen this image for your ${project.Name} project 
        Provide another image if you want`
        }
      </p>
      <img
        src={project.Image}
        alt={project.Name}
        className="w-1/3 h-1/3 m-auto border-[1px] border-white rounded-xl p-2"  
      />
      <FloatingLabelInput
        labelText="Image Link"
        type="text"
        id="image"
        value={newImage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewImage(e.target.value)
        }
        hasError={false}
      />
      <div className="flex">
      
        <div
          className="group m-auto rounded-full h-12 w-12 flex justify-center items-center border-[1px] border-white hover:bg-white cursor-pointer"
          onClick={handleSubmit}
        >
          <MdDone className="text-3xl text-white group-hover:text-zinc-900" />
        </div>
      </div>
    </div>
  );
};

export default ImageSelect;
