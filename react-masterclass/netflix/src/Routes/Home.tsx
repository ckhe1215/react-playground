import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { styled } from "styled-components";
import Shows from "../Components/Shows";
import Loader from "../Components/Loader";

const Wrapper = styled.div`
  background-color: black;
`;

export default function Home() {
  const { data: latestMovies, isLoading: isLatestMoviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: topRatedMovies, isLoading: isTopRatedMovies } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);
  const { data: upcomingMovies, isLoading: isUpcomingMovies } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getUpcomingMovies);
  return (
    <Wrapper>
      {isLatestMoviesLoading || isTopRatedMovies || isUpcomingMovies ? (
        <Loader />
      ) : (
        <Shows
          latest={latestMovies}
          topRated={topRatedMovies}
          upComing={upcomingMovies}
        />
      )}
    </Wrapper>
  );
}
