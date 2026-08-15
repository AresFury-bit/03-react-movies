// src/components/App.tsx

import SearchForm from "../SearchForm/SearchForm";
import {useState} from "react";
import { type Article } from "../../types/article"
import ArticleList from '../ArticleList/ArticleList';
import {fetchArticles} from "../../services/articleService"


export default function App() {

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleSearch = async (topic: string) => {
     try {
      setIsLoading(true);
      setIsError(false);
      // 2. Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Pleace loading</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
     {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}
/*
{articles.length > 0 && (
        <ul>
          {articles.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a href={url} target="_blank">{title}</a>
            </li>
          ))}
        </ul>
      )}
*/