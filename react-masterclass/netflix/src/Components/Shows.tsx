import React from "react";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "./Slider";
import ContentsBox from "./ContentsBox";
import { IGetMoviesResult } from "../api";

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

interface IShows {
  latest?: IGetMoviesResult;
  topRated?: IGetMoviesResult;
  upComing?: IGetMoviesResult;
}

export default function Shows({ latest, topRated, upComing }: IShows) {
  return (
    <>
      <Banner bgPhoto={makeImagePath(latest?.results[0].backdrop_path || "")}>
        <Title>{latest?.results[0].title}</Title>
        <Overview>{latest?.results[0].overview}</Overview>
      </Banner>
      <Slider title="Latest" data={latest} />
      <Slider title="Top Rated" data={topRated} />
      <Slider title="Upcoming" data={upComing} />
      <ContentsBox
        data={[
          ...(latest?.results || []),
          ...(topRated?.results || []),
          ...(upComing?.results || []),
        ]}
      />
    </>
  );
}
