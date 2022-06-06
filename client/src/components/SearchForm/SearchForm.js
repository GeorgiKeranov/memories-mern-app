import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterFields, getPosts } from '../../redux/posts';

export default function SearchForm() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.posts.filter);
  const [formData, setFormData] = useState(filter);

  function handleChange(event) {
    const element = event.target;

    setFormData(prevData => {
      return {
        ...prevData,
        [element.name]: element.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(setFilterFields(formData));

    // Set page to the first one because we are changing the filter
    const page = 1;

    dispatch(getPosts(page));
  }

  function removeFilters(event) {
    event.preventDefault();

    const initialFilters = {title: '', tags: '', page: 1};

    setFormData(initialFilters)
    dispatch(setFilterFields(initialFilters));

    // Set page to the first one because we are changing the filter
    const page = 1;
    
    dispatch(getPosts(page));
  }

  return (
    <div className="form grow-and-fade-in-animation">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Search Memories" onChange={handleChange} value={formData.title}/>

        <input type="text" name="tags" placeholder="Search Tags" onChange={handleChange} value={formData.tags}/>

        <button className="btn" type="submit">Search</button>

        {(filter.title || filter.tags) &&
          <button className="btn btn-cancel" onClick={removeFilters}>Remove Filters</button>
        }
      </form>
    </div>
  )
}