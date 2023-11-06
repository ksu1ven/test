import { useEffect, useState, MouseEvent } from 'react';
import { Post } from '../../components/posts-list-item/PostsListItem';
import { Input } from '../../components/input/Input';
import { HeroList } from '../../types/types';
import { Pagination } from '../../components/pagination/Pagination';
import './home.css';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [herous, setHerous] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [currentPage, setCurrenPage] = useState('1');
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  function getAllHerous() {
    fetch('https://swapi.dev/api/people/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setCount(data.count);
        setSearchParams({ page: currentPage, search: '' });
        setIsLoaded(false);
      });
  }

  function getSearchHerous(name: string, page: string) {
    fetch(`https://swapi.dev/api/people/?search=${name}&page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHerous(data.results);
        setCount(data.count);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setSearchParams({ page: page, search: `${name}` });
        setIsLoaded(false);
      });
  }

  function getNextPageHerous() {
    setIsLoaded(true);
    fetch(`${nextPage}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setSearchParams({
          page: `${String(Number(searchParams.get('page')) + 1)}`,
          search: `${searchParams.get('search')}`,
        });
        setIsLoaded(false);
      });
  }

  function getPrevPageHerous() {
    setIsLoaded(true);
    fetch(`${previousPage}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setHerous(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        getCurrentPage(data.previous, data.next);
        setSearchParams({
          page: `${String(Number(searchParams.get('page')) - 1)}`,
          search: `${searchParams.get('search')}`,
        });
        setIsLoaded(false);
      });
  }

  function getInputName(input: string) {
    setIsLoaded(true);
    setSearchParams({ search: input, page: '1' });
    getSearchHerous(input, searchParams.get('page') || '1');
  }

  function getCurrentPage(prev: string, next: string) {
    if (prev) {
      const currentPage = Number(prev.split('page=')[1]) + 1;
      return setCurrenPage(String(currentPage));
    } else if (next) {
      const currentPage = Number(next.split('page=')[1]) - 1;
      return setCurrenPage(String(currentPage));
    }
  }

  useEffect(() => {
    setIsLoaded(true);
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    console.log(page, search);
    if (search !== '' || page !== '1') {
      console.log('a');
      localStorage.setItem('name', search);
      getSearchHerous(search, page);
      return;
    } else if (localStorage.getItem('name')) {
      getSearchHerous(localStorage.getItem('name') || '', page);
    } else {
      getAllHerous();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClick(event: MouseEvent) {
    if (!isOpened) {
      return;
    }
    if (
      event.target instanceof HTMLElement &&
      !event.target.classList.contains('hero')
    ) {
      event.preventDefault();
      setIsOpened(false);
      return navigate('/');
    }
  }

  return (
    <>
      <div className="app" onClick={onClick}>
        <h1 className="title">The Star Wars Hero</h1>
        <Input
          callback={getInputName}
          default={searchParams.get('search') || ''}
        />
        <div className="content">
          <div className="posts-list">
            {isLoaded ? (
              <p className="loading">loading...</p>
            ) : (
              herous.map((hero: HeroList) => {
                const id = hero.url?.split('/')[5];
                return (
                  <Link className="post-link" key={id} to={`herous/${id}`}>
                    <Post name={hero.name} />
                  </Link>
                );
              })
            )}
            {!isLoaded && herous.length === 0 && (
              <p className="incorrect-name">Incorrect name</p>
            )}
            <Pagination
              currentPage={currentPage}
              isPrev={!previousPage}
              isNext={!nextPage}
              getPrevPage={getPrevPageHerous}
              getNextPage={getNextPageHerous}
              count={count}
              isLoaded={isLoaded}
            />
          </div>
          <Outlet context={[setIsOpened]} />
        </div>
      </div>
    </>
  );
}
