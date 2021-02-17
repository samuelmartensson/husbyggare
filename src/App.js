import React, { useState, useEffect, createContext } from "react";
import { fetchAPI } from "./utils/api";
import { houseByName } from "./queries";
import CategoryList from "./components/CategoryList";
import PlaceholderImage from "./media/placeholder.png";
import styled from "styled-components";
import ProductCard from "./components/ProductCard";

export const DataContext = createContext();

function App() {
  const [selectedData, setSelectedData] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const data = await fetchAPI(houseByName("Attefalls"));
    const array = Object.entries(data.houses.edges[0].node.house_types).map(
      item => {
        const [key, value] = item;
        return {
          name: key,
          items: Object.entries(value).map(j => ({ name: j[0], items: j[1] }))
        };
      }
    );
    setCategories(array);
  }, []);
  return (
    <DataContext.Provider value={{ selectedData, setSelectedData }}>
      <div className="App">
        <CategoryList data={categories} />
        <Wrapper>
          {selectedData &&
            Object.entries(selectedData).map(item => {
              const [key, value] = item;

              return (
                <div key={key}>
                  <h3>Vald: {key}</h3>
                  <TempView>
                    <ProductCard
                      title={value.selection.title}
                      imgSrc={
                        value.selection.item.bild
                          ? value.selection.item.bild.sourceUrl
                          : PlaceholderImage
                      }
                      price={value.selection.item.pris}
                    />
                    {value.subSelection && (
                      <ProductCard
                        title={value.subSelection.title}
                        imgSrc={
                          value.subSelection.item.bild
                            ? value.subSelection.item.bild.sourceUrl
                            : PlaceholderImage
                        }
                        price={value.subSelection.item.pris}
                      />
                    )}
                  </TempView>
                </div>
              );
            })}
          <Total>
            <span>Totalt pris: </span>
            {`${selectedData &&
              Object.entries(selectedData).reduce((acc, curr) => {
                if (curr[1].selection.item.pris)
                  return acc + curr[1].selection.item.pris;
                return acc;
              }, 0)}kr`}
          </Total>
        </Wrapper>
      </div>
    </DataContext.Provider>
  );
}

export default App;

const TempView = styled.div`
  width: 250px;
  img {
    width: 100px;
    height: 100px;
  }
`;

const Wrapper = styled.div``;
const Total = styled.div`
  position: fixed;
  bottom: 1rem;
  font-size: 2rem;
  right: 1rem;
`;
