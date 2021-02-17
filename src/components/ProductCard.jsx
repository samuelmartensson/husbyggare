import React, { useState } from "react";
import styled from "styled-components";

export default function ProductCard({
  title,
  price,
  imgSrc,
  isSelected,
  setIsSelected,
  isSubItem,
  obj
}) {
  function select(type) {
    if (type) {
      setIsSelected(prevState => ({
        ...prevState,
        subSelection: obj
      }));
    } else {
      setIsSelected(prevState => ({
        ...prevState,
        selection: obj
      }));
    }
  }

  return (
    <Container onClick={() => select(isSubItem)} isSelected={isSelected}>
      <img src={imgSrc} />
      <h3>{title}</h3>
      <div>{`${price ? price : "0"} kr`}</div>
    </Container>
  );
}

const Container = styled.div`
  border: ${({ isSelected }) =>
    isSelected ? "4px solid #77dd77" : "1px solid #e4e4e4"};
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  margin: ${({ isSelected }) => (isSelected ? "calc(1rem - 3px)" : "1rem")};
  border-radius: 0.5rem;

  img {
    width: 190px;
    height: 190px;
    object-fit: cover;
  }
`;
