import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import ContentsBox from "../Components/ContentsBox";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              latestMovies?.results[0].backdrop_path || ""
            )}
          >
            <Title>{latestMovies?.results[0].title}</Title>
            <Overview>{latestMovies?.results[0].overview}</Overview>
          </Banner>
          <Slider title="Latest Movies" data={latestMovies} />
          <Slider title="Top Rated Movies" data={topRatedMovies} />
          <Slider title="Upcoming Movies" data={upcomingMovies} />
          <ContentsBox
            data={[
              ...(latestMovies?.results || []),
              ...(topRatedMovies?.results || []),
              ...(upcomingMovies?.results || []),
            ]}
          />
        </>
      )}
    </Wrapper>
  );
}
