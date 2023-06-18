import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 60vw;
  height: 70vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default function ContentsBox({ data }: { data?: IGetMoviesResult }) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const onOverlayClicked = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  return (
    <div>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie layoutId={bigMovieMatch.params.movieId}>
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )}
                 )`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
