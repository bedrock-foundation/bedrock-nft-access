import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import CollectionData from '../assets/CollectionData';
import styled from '@emotion/styled';
import Text, { TextTypesEnum } from "../elements/Text";
import Colors from "../styles/Colors";
import AppState from "../recoil/app.recoil";
import Card from "../elements/Card";


const Container = styled.div``;

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

type CardProps = {
  collection: any;
};

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
              name={collection.name}
              image={collection.image}
              onClick={() => selectCollection(collection?.collectionId ?? '')}
            />
          );
        });
      })()}
      </Grid>
    </Container>
    
  );
};

export default CollectionList;
