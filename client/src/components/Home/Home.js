import Main from '../Main/Main';
import MainColumns from '../Main/MainColumns/MainColumns';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

export default function Home() {
  return (
    <Main>
      <MainColumns content={<Posts />} sidebar={<Form />} />
    </Main>
  )
}
