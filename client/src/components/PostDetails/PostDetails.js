import { useParams } from 'react-router-dom';
import Main from '../Main/Main';

export default function PostDetails() {
  const { id } = useParams();

  return (
    <Main>
      <div>PostDetails for post with id - {id}</div>
    </Main>
  )
}