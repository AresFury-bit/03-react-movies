// src/services/articleService.ts

import axios from "axios";
import type { Movie } from "../types/movie"


interface MoviesHttpReesponse{
    results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;


export const fetchMovies = async (topic: string): Promise<Movie[]>=> {
  const response = await axios.get<MoviesHttpReesponse>(`https://api.themoviedb.org/3/search/movie`, {
  params: {
      query: topic,
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
}
    );
    return response.data.results;
}



/*

interface ArticlesHttpResponse {
  hits: Article[];
}


export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  return response.data.hits;
};
*/