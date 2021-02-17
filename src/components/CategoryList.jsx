// e.g. Exterior, interior etc...
import React from "react";
import styled from "styled-components";
import Category from "./Category";

export default function CategoryList({ data }) {
  return (
    <Container>
      {data.map((category, i) => {
        return <Category key={i} name={category.name} data={category.items} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem;
`;
