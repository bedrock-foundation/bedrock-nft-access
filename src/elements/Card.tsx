import styled from '@emotion/styled';

type CardProps = {
  collection: any;
  margin?: string;
};

const Card = styled.div<CardProps>`
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;
  margin: ${props => props.margin ?? '16px'};
  font-size: 30px;
  text-align: center;
  background-image: url(${(props) => props.collection.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  width: 300px;
`;

export default Card;
