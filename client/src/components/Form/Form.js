import { useSelector, useDispatch } from 'react-redux';
import './Form.css';
import { savePost, updatePost, setFormData, resetFormData } from '../../redux/posts';
import Loader from '../Loader/Loader';
import ImageInput from './ImageInput/ImageInput';

export default function Form() {
  const dispatch = useDispatch();
  
  const authUser = useSelector(state => state.auth.user);
  const [formData, isFormInEditMode, isFormLoading] = useSelector(state => [
    state.posts.formData,
    state.posts.isFormInEditMode,
    state.posts.isFormLoading
  ]);

  function handleChange(event) {
    const element = event.target;
    const name = element.name;
    const value = element.value

    const newFormData = {
      ...formData,
      [name]: name === 'tags' ? value.split(',') : value
    };

    dispatch(setFormData(newFormData));
  }

  function setImage(imageBase64) {
    const newFormData = {
      ...formData,
      image: imageBase64
    };
    
    dispatch(setFormData(newFormData));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isFormInEditMode) {
      return dispatch(updatePost({postId: formData._id, postData: formData}));
    }

    dispatch(savePost(formData));
  }

  function cancelEdit() {
    dispatch(resetFormData());
  }

  if (isFormLoading) {
    return <Loader />;
  }

  const actionName = isFormInEditMode ? 'Edit' : 'Post';

  return (
    <div className="form form--create-memory grow-and-fade-in-animation">
      {authUser ?
          <>
            <h2>{actionName} a Memory</h2>

            <form>
              <input type="text" name="title" placeholder="Title" onChange={handleChange} value={formData.title}/>

              <textarea name="message" placeholder="Message" onChange={handleChange} value={formData.message}/>

              <input type="text" name="tags" placeholder="Tags" onChange={handleChange} value={formData.tags}/>

              <ImageInput setImage={setImage} />

              <button className="btn" onClick={handleSubmit}>{actionName}</button>
            </form>
          </>
        :
          <h3>Please register or login first to be able to post a memory!</h3>
      }

      {isFormInEditMode && <button className="btn-cancel" onClick={cancelEdit}>Cancel Edit</button>}
    </div>
  )
}