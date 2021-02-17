import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import PlaceholderImage from "../media/placeholder.png";
import { DataContext } from "../App";

export default function SubCategory({ data, categoryKey }) {
  const [loading, setLoading] = useState(true);
  const [subItems, setSubItems] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { setSelectedData, selectedData } = useContext(DataContext);

  useEffect(() => {
    const subItems = data
      .filter(product => product.item.subItems)
      .map(i => i.item.subItems);
    setSubItems(subItems[0]);
  }, []);

  useEffect(() => {
    if (data) {
      const hasSubItems =
        isSelected.selection && !!isSelected.selection.item.subItems;
      setLoading(false);
      setSelectedData(prevState => ({
        ...prevState,
        [categoryKey]: {
          selection: isSelected.selection ? isSelected.selection : data[0],
          subSelection: hasSubItems
            ? isSelected.subSelection
              ? isSelected.subSelection
              : subItems[0]
            : undefined
        }
      }));

      if (isSelected && hasSubItems) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [isSelected]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        {data &&
          data.map((product, i) => {
            return (
              <ProductCard
                key={i}
                obj={product}
                title={product.title}
                imgSrc={
                  product.item.bild
                    ? product.item.bild.sourceUrl
                    : PlaceholderImage
                }
                price={product.item.pris}
                isSelected={product === selectedData[categoryKey].selection}
                setIsSelected={setIsSelected}
              />
            );
          })}
      </Container>

      <AnimatedContainer isOpen={isOpen}>
        {subItems &&
          subItems.map((product, i) => {
            return (
              <ProductCard
                key={i}
                obj={product}
                title={product.title}
                imgSrc={
                  product.item.bild
                    ? product.item.bild.sourceUrl
                    : PlaceholderImage
                }
                price={product.item.pris}
                isSelected={product === selectedData[categoryKey].subSelection}
                setIsSelected={setIsSelected}
                isSubItem={true}
              />
            );
          })}
      </AnimatedContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;
const AnimatedContainer = styled.div`
  display: flex;
  overflow: auto;
  transition: 500ms ease;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0px")};
`;
