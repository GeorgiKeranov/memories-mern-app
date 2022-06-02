import { useDispatch, useSelector } from 'react-redux';
import { setFilterFields, getPosts } from '../../redux/posts';

export default function SearchForm() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.posts.filter);

  function handleChange(event) {
    const element = event.target;

    dispatch(setFilterFields({
      ...filter,
      [element.name]: element.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    dispatch(getPosts(1));
  }

  return (
    <div className="form grow-and-fade-in-animation">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Search Memories" onChange={handleChange} value={filter.title}/>

        <input type="text" name="tags" placeholder="Search Tags" onChange={handleChange} value={filter.tags}/>

        <button className="btn" type="submit">Search</button>
      </form>
    </div>
  )
}