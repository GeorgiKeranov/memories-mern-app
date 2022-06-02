import Main from '../Main/Main';
import MainContent from '../Main/MainColumns/MainContent';
import MainSidebar from '../Main/MainColumns/MainSidebar';
import Posts from '../Posts/Posts';
import SearchForm from '../SearchForm/SearchForm';
import MemoryForm from '../MemoryForm/MemoryForm';

export default function Home() {
  return (
    <Main>
      <MainContent>
        <Posts />
      </MainContent>

      <MainSidebar>
        <SearchForm />

        <MemoryForm />
      </MainSidebar>
    </Main>
  )
}
