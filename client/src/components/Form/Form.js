import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Form.css';
import { savePost } from '../../redux/posts';

export default function Form() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  async function handleChange(event) {
    const element = event.target;
    const name = element.name;

    let value = element.value
    // Get base64 encoding if the element is image
    if (name === 'image') {
      value = await convertFileToBase64(element.files[0]);
    }

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    dispatch(savePost(formData));
  }

  async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <div className="form-create-memory">
      <h2>Create a Memory</h2>

      <form>
        <input type="text" name="creator" placeholder="Creator" onChange={handleChange}/>

        <input type="text" name="title" placeholder="Title" onChange={handleChange}/>

        <textarea name="message" placeholder="Message" onChange={handleChange}/>

        <input type="text" name="tags" placeholder="Tags" onChange={handleChange}/>

        <input type="file" name="image" onChange={handleChange}/>

        <button className="btn" onClick={handleSubmit}>Post</button>
      </form>

      <button className="btn-cancel">Clear</button>
    </div>
  )
}