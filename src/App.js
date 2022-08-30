import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

// Questions:
// 1. Load data from local file (path: “https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json”)
// 2. Use the screenshot as an example, implement a generic function for reading any JSON file in that format, then display the top 12 brands based on audience_size. We always want to have 4 items in one row.
// 3. Add a hover state with a dark, semi-transparent overlay and display the ID of the hovered brand.

const JSON_DATA_URL = 'https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch(JSON_DATA_URL);
      res = (await res.json()).data;
      res.sort((a, b) => (b.source_items.audience_size - a.source_items.audience_size));
      setData(res);
    })();
  }, []);

  return (
    <div className="App">
      <MainContainer>
        {data?.map((val) => (
          <BoxTopContainer key={val.social_media_pages.id}>
            <LogoBox>
              <OverLayContainer className="overlay">
                {val.source_items.id}
              </OverLayContainer>
              <StyledImg src={val.social_media_pages.picture} alt={val.name} />
            </LogoBox>
          </BoxTopContainer>
        ))}
      </MainContainer>
    </div>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const BoxTopContainer = styled.div`
  padding: 50px;
`;

const LogoBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  .overlay {
    display: none;
  }

  :hover {
    .overlay {
      display: flex;
    }
  }
`;

const StyledImg = styled.img`
  object-fit: contain;
`;

const OverLayContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 13x;
`;
