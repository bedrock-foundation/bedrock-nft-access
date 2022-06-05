import React from "react";
import CollectionData from '../assets/CollectionData';
import styled from '@emotion/styled';
import Authenticate from "./Authenticate";


const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  width: 100%;
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
`;

type CollectionListProps = {};

const CollectionList: React.FC<CollectionListProps> = () => {
  const [selectedCollection, setSelectedCollection] = React.useState<any>("");

  return (
    <Container>
      {(() => {
        if(selectedCollection) {
          return (
           <Authenticate collection={selectedCollection}  />
          );
        }

        return CollectionData.map((collection, index) => {
          return (
            <Card
              key={index}
              collection={collection}
              onClick={() => setSelectedCollection(collection)}
            >
              {collection.name}
            </Card>
          );
        });
      })()}
    </Container>
  );
};

export default CollectionList;
