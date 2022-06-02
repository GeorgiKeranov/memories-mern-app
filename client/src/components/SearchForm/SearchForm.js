import { useState } from 'react';

export default function SearchForm() {
  const [formData, setFormData] = useState({title: '', tags: ''});

  function handleChange(event) {
    const element = event.target;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [element.name]: element.value
      };
    });
  }

  function handleSubmit() {
    console.log(formData);
  }

  return (
    <div className="form grow-and-fade-in-animation">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Search Memories" onChange={handleChange} value={formData.title}/>

        <input type="text" name="tags" placeholder="Search Tags" onChange={handleChange} value={formData.tags}/>

        <button className="btn" type="submit">Search</button>
      </form>
    </div>
  )
}