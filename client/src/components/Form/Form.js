import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Form.css';
import { savePost, updatePost, setPostToEdit } from '../../redux/posts';
import Loader from '../Loader/Loader';

export default function Form() {
  const dispatch = useDispatch();

  const formDataInitialState = {
    title: '',
    message: '',
    tags: '',
  };

  const [formData, setFormData] = useState(formDataInitialState);

  const [postToEdit, isFormLoading] = useSelector(state => [state.posts.postToEdit, state.posts.isFormLoading]);
  const actionName = postToEdit ? 'Edit' : 'Post';

  useEffect(() => {
    if (postToEdit) {
      setFormData(postToEdit);
    }
  }, [postToEdit]);

  async function handleChange(event) {
    const element = event.target;
    const name = element.name;
    let value = element.value

    // Get base64 encoding if the element is image
    if (name === 'image') {
      try {
        value = await convertFileToBase64(element.files[0]);
      } catch (error) {
        return console.log(error);
      }
    }

    if (name === 'tags') {
      value = value.split(',');
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

    if (postToEdit) {
      return dispatch(updatePost({postId: postToEdit._id, postData: formData}));
    }

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

  function cancelEdit() {
    dispatch(setPostToEdit(null));

    setFormData(formDataInitialState);
  }

  if (isFormLoading) {
    return <Loader />;
  }

  return (
    <div className="form form--create-memory grow-and-fade-in-animation">
      <h2>{actionName} a Memory</h2>

      <form>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={formData.title}/>

        <textarea name="message" placeholder="Message" onChange={handleChange} value={formData.message}/>

        <input type="text" name="tags" placeholder="Tags" onChange={handleChange} value={formData.tags}/>

        <input type="file" name="image" onChange={handleChange}/>

        <button className="btn" onClick={handleSubmit}>{actionName}</button>
      </form>

      {postToEdit && <button className="btn-cancel" onClick={cancelEdit}>Cancel Edit</button>}
    </div>
  )
}