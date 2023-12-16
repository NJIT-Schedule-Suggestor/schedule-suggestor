import { useState } from "react";
import { Header } from "../components/Header";

export default function Home() {
  const [hoveredPerson, setHoveredPerson] = useState(null);

  const Space = () => {
    return (
      <h1 style={{ fontSize: "20px", fontFamily: "Arial" }}>&nbsp;&&nbsp;</h1>
    );
  };

  const NameShow = ({ name }) => {
    return (
      <h1
        onClick={() => handleOpenWebsite(name)}
        onMouseEnter={() => setHoveredPerson(name)}
        onMouseLeave={() => setHoveredPerson(null)}
        style={{
          fontSize: "20px",
          fontFamily: "Arial",
          cursor: "pointer",
          color: hoveredPerson === name ? "blue" : "black",
          textDecoration: hoveredPerson === name ? "underline" : "none",
          transition: "color 0.3s ease, textDecoration 0.3s ease",
        }}
      >
        {name}
      </h1>
    );
  };

  const handleOpenWebsite = (person) => {
    let websiteURL = "";
    if (person === "Zaid") {
      websiteURL = "https://www.linkedin.com/in/zaidabujumaiza/";
    } else if (person === "Maahir") {
      websiteURL = "https://www.linkedin.com/in/maahir-vohra-669914234/";
    } else if (person === "Sandeep") {
      websiteURL = "https://www.linkedin.com/in/sandeep-singh-00a903200/";
    } else {
      return;
    }
    window.open(websiteURL, "_blank");
  };

  return (
    <div className="home">
      <Header text="Homepage" size="medium" />
      <div style={styles.homecontent}>
        <h1 style={{ fontSize: "20px", fontFamily: "Arial" }}>Created By:</h1>
        <div style={styles.names}>
          <NameShow name="Maahir V." />
          <Space />
          <NameShow name="Zaid A." />
          <Space />
          <NameShow name="Sandeep S." />
        </div>
      </div>
    </div>
  );
}

const styles = {
  homecontent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  names: {
    display: "flex",
    flexDirection: "row",
  },
};
