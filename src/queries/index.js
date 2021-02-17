export const houseByName = slug => {
  return `
    {
        houses(where: {name: "${slug}"}) {
            edges {
                node {
                  title
                  house_types {
                    exterior {
                      fasadpanelprofil {
                          ${itemFragment}
                      }
                      hangrannorOchStupor {
                          ${itemFragment}
                      }
                      tak {
                          ${itemFragment}
                      }
                    }
                    interior {
                      golv {
                          ${itemFragment}
                      }
                      innerpanelTakVagg {
                          ${itemFragment}
                      }
                    }
                  }
                }
              }
        }
      }
    `;
};

const itemFragment = `
... on Item {
    title
    item {
      pris
      bild {
        sourceUrl
      }
      subItems {
        ... on Item {
          title
          item {
            pris
            bild {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
