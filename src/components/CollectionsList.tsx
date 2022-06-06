import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import CollectionData from '../assets/CollectionData';
import styled from '@emotion/styled';
import Text, { TextTypesEnum } from "../elements/Text";
import Colors from "../styles/Colors";
import AppState from "../recoil/app.recoil";


const Container = styled.div``;

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

type CardProps = {
  collection: any;
};

const Card = styled.div<CardProps>`
  border-radius: 16px;
  padding: 8px;
  margin: 16px;
  font-size: 30px;
  text-align: center;
  background-image: url(${(props) => props.collection.image});
  background-size: cover;
  background-position: center;
  height: 300px;
  width: 300px;
  grid-template-columns: 1fr 1fr 1fr;

`;

type CollectionListProps = {};

const CollectionList: React.FC<CollectionListProps> = () => {
  const navigate = useNavigate();

  const [_, setCollectionId] = useRecoilState(AppState.collectionId);

  const selectCollection = (collectionId: string) => {
    setCollectionId(collectionId);
    navigate(`/authenticate?collectionId=${collectionId}`);
  }

  return (
    <Container>    
      <Text type={TextTypesEnum.Bold24} color={Colors.White}>
        Select Collection
      </Text>
      <Grid>
      {(() => {
        return CollectionData.map((collection, index) => {
          return (
            <Card
              key={index}
              collection={collection}
              onClick={() => selectCollection(collection?.collectionId ?? '')}
            >
              {collection.name}
            </Card>
          );
        });
      })()}
      </Grid>
    </Container>
    
  );
};

export default CollectionList;
