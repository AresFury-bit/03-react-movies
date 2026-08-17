// src/components/App.tsx

import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const [selectedMovie, setSelectedMovie] = useState(false);

  const handleSubmit = async (topic: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      // debugger;
      const data = await fetchMovies(topic);
      setMovies(data);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      toast.error("This didn't work.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedMovie = (movie: Movie) => {
    setMovie(movie);
  };

  const closeModal = () => {
    setMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      <MovieGrid movies={movies} onSelect={handleSelectedMovie} />
      {isError && <ErrorMessage />}
      {movie && <MovieModal onClose={closeModal} movie={movie} />}
    </>
  );
}

/*
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
    

    return (
    <>
      <SearchBar/>
        <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Pleace loading</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
     {articles.length > 0 && <ArticleList items={articles} />}
    </>
  
  };

*/
