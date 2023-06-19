import React from "react";
import { useLocation } from "react-router-dom";
import { IGetMoviesResult, getSearchMovies, getSearchTvs } from "../api";
import { useQuery } from "react-query";
import Slider from "../Components/Slider";
import Loader from "../Components/Loader";
import { styled } from "styled-components";

const Wrapper = styled.div`
  margin-top: 300px;
`;

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movieResult, isLoading: isMovieResultLoading } =
    useQuery<IGetMoviesResult>(["search", "movie"], () =>
      getSearchMovies(keyword ?? "")
    );
  const { data: tvResult, isLoading: isTvResultLoading } =
    useQuery<IGetMoviesResult>(["search", "tv"], () =>
      getSearchTvs(keyword ?? "")
    );
  return (
    <Wrapper>
      {isMovieResultLoading || isTvResultLoading ? (
        <Loader />
      ) : (
        <>
          <Slider title="Movies" data={movieResult} />
          <Slider title="Tvs" data={tvResult} />
        </>
      )}
    </Wrapper>
  );
}
