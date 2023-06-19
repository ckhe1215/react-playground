import React from "react";
import { styled } from "styled-components";
import Loader from "../Components/Loader";
import Shows from "../Components/Shows";
import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getLatestTvs,
  getPopularTvs,
  getTopRatedTvs,
} from "../api";

const Wrapper = styled.div`
  background-color: black;
`;

export default function Tv() {
  const { data: latestShows, isLoading: isLatestShowsLoading } =
    useQuery<IGetMoviesResult>(["tvs", "latest"], getLatestTvs);
  const { data: topRatedShows, isLoading: isTopRatedShowsLoading } =
    useQuery<IGetMoviesResult>(["tvs", "topRated"], getTopRatedTvs);
  const { data: popularShows, isLoading: isPopularShowsLoading } =
    useQuery<IGetMoviesResult>(["tvs", "popular"], getPopularTvs);
  console.log(latestShows);
  return (
    <Wrapper>
      {isLatestShowsLoading ||
      isTopRatedShowsLoading ||
      isPopularShowsLoading ? (
        <Loader />
      ) : (
        <Shows
          latest={latestShows}
          topRated={topRatedShows}
          upComing={popularShows}
        />
      )}
    </Wrapper>
  );
}
