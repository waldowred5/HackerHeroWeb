import React from 'react';
import {
  ParagraphContainer,
  StyledHeading,
  // eslint-disable-next-line no-unused-vars
  StyledList,
  StyledParagraph,
  UIContainer,
} from './styles';
import { GAME_SCREEN } from '../../utils/constants';
import { useRecoilValue } from 'recoil';
import { gameScreenState } from '../GameManager/store';
import { guiDebugger } from '../../utils/guiDebugger';
import { adjacencyListState } from '../ServerOrb/store';

export const UI = () => {
  const gameScreen = useRecoilValue(gameScreenState);
  const adjacencyList = useRecoilValue(adjacencyListState);

  const edges = (adjacency) => {
    return adjacencyList[adjacency].edges.reduce((acc, edge) => {
      return [
        ...acc,
        ' ' + edge.uuid.slice(0, 4),
      ];
    }, '');
  };

  return (
    <>
      {
        (gameScreen === GAME_SCREEN.PLAY && guiDebugger) &&
        <UIContainer>
          <StyledHeading>Adjacency List:</StyledHeading>
          <ParagraphContainer>
            {
              adjacencyList &&
            Object.keys(adjacencyList).map((adjacency, index) => {
              return (
                <>
                  <StyledParagraph
                    key={`${index}: ${adjacency}`}
                  >
                    { index }:
                    { adjacency.slice(0, 4) + ' -> ' + edges(adjacency) }
                  </StyledParagraph>
                  {/* <StyledList>*/}
                  {/*  {*/}
                  {/*    adjacencyList[index].edges.map(*/}
                  {/*        (edge, index) => {*/}
                  {/*          return (*/}
                  {/*            <li*/}
                  {/*              key={`${index}: ${edge}`}*/}
                  {/*            >*/}
                  {/*              <StyledParagraph>*/}
                  {/*                { edge }*/}
                  {/*              </StyledParagraph>*/}
                  {/*            </li>*/}
                  {/*          );*/}
                  {/*        })*/}
                  {/*  }*/}
                  {/* </StyledList>*/}
                </>
              );
            })
            }
          </ParagraphContainer>
        </UIContainer>
      }
    </>
  );
};
