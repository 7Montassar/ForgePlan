import React, { useState } from 'react'
import FloatingLabelInput from '../FloatingLabelInput';
import { MdNavigateNext } from 'react-icons/md';
import { project } from '@/types/Project';

const ProjectForm = ({setProject, setPhase}: {setProject: React.Dispatch<React.SetStateAction<project| null>>, setPhase: React.Dispatch<React.SetStateAction<number>>}) => {
  const [name, setName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/createProject", {
        method: "POST",
        body: JSON.stringify({
          name,
          deadline,
          pdf,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setProject(data as project);
      setPhase(2);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-8">
          <form className="flex flex-col gap-10 ">
            <FloatingLabelInput
              labelText="Project Name"
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              hasError={false}
            />
            <FloatingLabelInput
              labelText="Deadline"
              type="text"
              id="deadline"
              value={deadline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDeadline(e.target.value)
              }
              hasError={false}
            />
            <FloatingLabelInput
              labelText="Pdf Link"
              type="text"
              id="pdf"
              value={pdf}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPdf(e.target.value)
              }
              hasError={false}
            />
          </form>
          <div
            className="group m-auto rounded-full h-12 w-12 flex justify-center items-center border-[1px] border-white hover:bg-white cursor-pointer"
            onClick={handleSubmit}
          >
            <MdNavigateNext className="text-3xl text-white group-hover:text-zinc-900" />
          </div>
        </div>
  )
}

export default ProjectForm
