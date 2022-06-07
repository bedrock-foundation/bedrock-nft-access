import React from "react";
import styled from "@emotion/styled";
import Colors from "../styles/Colors";
import * as Polished from 'polished';
import Text, { TextTypesEnum } from "../elements/Text";

type ContainerProps = {
  image: string;
  margin?: string;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 16px;
  box-sizing: border-box;
  margin: ${(props) => props.margin ?? "16px"};
  font-size: 30px;
  text-align: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  width: 300px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Polished.rgba(Colors.AlmostDarkBlue, 0.80)};
  height: 40px;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

type CardProps = {
  image: string;
  name: string;
  margin?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  image,
  name,
  margin,
  onClick,
}) => {
  return (
    <Container image={image} margin={margin} onClick={onClick}>
      <Info>
        <Text type={TextTypesEnum.Bold18} color={Colors.White} margin="0 16px 0">
          {name}
        </Text>
      </Info>
    </Container>
  );
};

export default Card;

