import Main from '../Main/Main';
import MainColumns from '../Main/MainColumns/MainColumns';
import Posts from '../Posts/Posts';
import MemoryForm from '../MemoryForm/MemoryForm';

export default function Home() {
  return (
    <Main>
      <MainColumns content={<Posts />} sidebar={<MemoryForm />} />
    </Main>
  )
}
