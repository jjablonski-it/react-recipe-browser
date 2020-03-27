import React from "react";

import { Card, CardBody, CardImg, Col } from "reactstrap";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`} ease-in;
`;

export const Recipe = ({ hit }) => {
  return (
    <Col md={4} lg={3} xs={6} className="my-2">
      <FadeIn>
        <Card>
          <CardImg src={hit.recipe.image}></CardImg>
          <CardBody>
            <a href={hit.recipe.url}>{hit.recipe.label}</a>
          </CardBody>
        </Card>
      </FadeIn>
    </Col>
  );
};
