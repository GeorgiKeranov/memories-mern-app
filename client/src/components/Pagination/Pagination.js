import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/posts';
import './Pagination.css';

export default function Pagination({mobile}) {
  const dispatch = useDispatch();

  const [currentPage, numberOfPages, arePostsLoading] = useSelector(state => {
    return [
      state.posts.filter.page,
      state.posts.numberOfPages,
      state.posts.arePostsLoading
    ]
  });

  if (arePostsLoading) {
    return <></>;
  }

  if (numberOfPages <= 1 ) {
    return <></>;
  }

  function prevPage() {
    goToPage(null, currentPage - 1);
  }

  function nextPage() {
    goToPage(null, currentPage + 1);
  }

  function goToPage(event, page) {
    if (event) {
      page = parseInt(event.target.innerText);
    }

    dispatch(getPosts(page));
  }

  const maxVisiblePages = 1;
  const visiblePages = [];
  // Generate visible pages before and after current page
  for (let page = currentPage - maxVisiblePages; page <= currentPage + maxVisiblePages; page++) {
    // If the page is smaller than one or bigger than total pages do not add it
    if (page < 1 | page > numberOfPages) {
      continue;
    }

    visiblePages.push(page);
  }

  const visiblePagesJsx = visiblePages.map(page => {
    return (
      <li key={page}><button className={page === currentPage ? 'current' : ''} onClick={goToPage}>{page}</button></li>
    );
  })

  const firstPage = 1;
  const lastPage = numberOfPages;
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  return (
    <div className={`pagination${mobile ? ' pagination--mobile' : ''} grow-and-fade-in-animation`}>
      <ul>
        <li><button disabled={currentPage === 1 ? 'disabled' : ''} onClick={prevPage}>{'⮜'}</button></li>

        {/* Render first page with dots if it is not in the visible pages */
        firstPage !== firstVisiblePage &&
          <>
            <li><button onClick={goToPage}>{firstPage}</button></li>

            <li>...</li>
          </>
        }
        
        {visiblePagesJsx}

        {/* Render dots with last page if it is not in the visible pages */
        lastPage !== lastVisiblePage &&
          <>
            <li>...</li>

            <li><button onClick={goToPage}>{lastPage}</button></li>
          </>
        }

        <li><button disabled={currentPage === lastVisiblePage ? 'disabled' : ''} onClick={nextPage}>{'⮞'}</button></li>
      </ul>
    </div>
  )
}