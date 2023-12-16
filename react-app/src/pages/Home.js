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
        <br />
        <h1 style={{ fontSize: "30px", fontFamily: "Arial", color: "#1da1f2" }}>
          Welcome to the NJIT Schedule Generator
        </h1>
        <h1
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          What is this?
        </h1>
        <div style={styles.homecontent}>
          <p1 style={styles.whatthistext}>
            There's nothing more stressful than having to create your schedule.
            Making sure the
          </p1>
          <p1 style={styles.whatthistext}>
            classes you choose fit with work, classes overlapping, or maybe you
            just don't want to
          </p1>
          <p1 style={styles.whatthistext}>take classes on Monday...</p1>
          <br />
          <p1 style={styles.whatthistext}>
            Thats why we created the schedule generator, you tell us what
            classes you want, days you
          </p1>
          <p1 style={styles.whatthistext}>want, and times you want</p1>
          <p1 style={styles.whatthistext}>
            and we'll make your schedule for you!
          </p1>
        </div>
        <br /> <br /> <br /> <br />
        <div style={styles.homecontent}>
          <h1 style={{ fontSize: "30px", fontFamily: "Arial", margin: "0px" }}>
            To start, select <span style={{ color: "red" }}>Courses</span> from
            the side bar!
          </h1>
          <p1 style={styles.notetext}>
            Note: You may not get exactly what you want as some combinations may
            simply not be possible
          </p1>
        </div>
        <br /> <br />
        <p1 style={styles.notetext}>
          Created by NJIT students, for NJIT students.
        </p1>
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
    margin: "-10px",
  },
  whatthistext: {
    fontFamily: "Times New Roman",
    margin: "2px",
  },
  notetext: {
    fontSize: "17px",
    fontWeight: "bold",
    fontFamily: "Arial",
  },
};
