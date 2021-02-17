import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import SubCategory from "./SubCategory";

const categoryKeyMap = {
  exterior: "Exteriör",
  interior: "Interiör"
};

const subCategoryKeyMap = {
  fasadpanelprofil: "Fasadpanel profil",
  hangrannorOchStupor: "Hängrännor och stuprör",
  tak: "Tak",
  golv: "Golv",
  innerpanelTakVagg: "Innerpanel tak och vägg"
};

export default function Category({ data, name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <h1 onClick={() => setIsOpen(state => !state)}>{categoryKeyMap[name]}</h1>
      <AnimationContainer isOpen={isOpen}>
        {data.map((subCategory, i) => (
          <SubCategoryContainer key={i}>
            <h2>{subCategoryKeyMap[subCategory.name]}</h2>
            <small>({subCategory.name})</small>
            <SubCategory
              categoryKey={subCategory.name}
              data={subCategory.items}
            />
          </SubCategoryContainer>
        ))}
      </AnimationContainer>
    </Container>
  );
}
const SubCategoryContainer = styled.div`
  background: white;
  padding: 1rem;
  cursor: initial;
`;
const AnimationContainer = styled.div`
  transition: 300ms ease;
  border: ${({ isOpen }) => (isOpen ? "1px solid #e4e4e4" : "none")};
  border-top: none;
  overflow: auto;
  max-height: ${({ isOpen }) => (isOpen ? "80vh" : "0px")};
`;
const Container = styled.div`
  h1 {
    font-size: 1.5rem;
    border-radius: 1rem;
    padding: 1rem;
    background: #f1f1f1;
  }
  cursor: pointer;
  margin-bottom: 1rem;
`;
