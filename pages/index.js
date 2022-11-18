import React from "react";
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  //const estiloDaHomePage = {
  //*backgroundColor: "red"
  //};
  //*console.log(config.playlists);
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  //const valorDoFiltro = "Call"
  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "Column",
        flex: 1,
      }}>
        {/*Prop Drilling*/}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage

//function Menu() {
//return (
//<div>
//Menu
//</div>
//)
//}

const StyledHeader = styled.div`
img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-info{
  margin-top: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  gap: 16px;
}
`;
function Header() {
  return (
    <StyledHeader>
      <section className="user-info">
        {/*<img src="banner" />*/}
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({searchValue, ...props}) {
  //*console.log("Dentro do Componente", props.playlists);
  const playlistsNames = Object.keys(props.playlists);
  //Statement
  // Retorno por expressão
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        //console.log(playlistName);
        //console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized);
              }).map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  )
}

