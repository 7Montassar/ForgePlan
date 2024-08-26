import React from "react";


const AddProject = () => {
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")
    const deadline = formData.get("deadline")
    const pdf = formData.get("pdf")
    try{
      const res = await fetch('http://localhost:8080/projects',{
        method: 'POST',
        body: JSON.stringify({
          name: name,
          deadline: deadline,
          pdf: pdf,
        }),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" name="name"/>
        <input type="text" placeholder="Deadline" name="deadline"/>
        <input type="text" placeholder="Pdf Link" name="pdf"/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddProject
