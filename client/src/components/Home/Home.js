import Main from '../Main/Main';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

export default function Home() {
  return (
    <Main content={<Posts />} sidebar={<Form />} />
  )
}
