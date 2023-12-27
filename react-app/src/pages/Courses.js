import React, { useState } from "react";
import { Header } from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Courses() {
  const [semester, setSemester] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  const [creditCount, setCreditCount] = useState(0);

  return (
    <div className="courses">
      <Header text="Course Search" size="medium" />
      <div style={styles.inputContent}>
        <select
          id="dropdown"
          style={styles.semesterDropdown}
          value={semester}
          onChange={(event) => setSemester(event.target.value)}
        >
          <option value="">Semester</option>
          <option value="spring2024">Spring 2024</option>
        </select>

        <input
          style={styles.classInputSearch}
          type="text"
          placeholder="Search For Class"
          value={searchClass}
          onChange={(event) => setSearchClass(event.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} style={styles.icon} />
        <button style={styles.classInputSearchButton}>
          View all NJIT Courses
        </button>
        <div style={styles.courseCountInfo}>
          <p style={styles.courseCountInfoText}>Total Course: {courseCount}</p>
          <p style={styles.courseCountInfoText}>Total Credits: {creditCount}</p>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #ddd" }}></div>
    </div>
  );
}

const styles = {
  semesterDropdown: {
    padding: "8px",
    fontSize: "12px",
    borderRadius: "4px",
    backgroundColor: "#e0e0e0",
    color: "black",
    fontWeight: "bold",
    height: "35px",
    width: "125px",
    border: "1px solid #ccc",
    marginRight: "30px",
  },
  classInputSearch: {
    position: "relative",
    padding: "8px",
    fontSize: "12px",
    borderRadius: "4px",
    backgroundColor: "#e0e0e0",
    color: "black",
    fontWeight: "bold",
    height: "17px",
    width: "350px",
    border: "1px solid #ccc",
    marginRight: "14px",
  },
  classInputSearchButton: {
    padding: "8px",
    fontSize: "12px",
    borderRadius: "4px",
    backgroundColor: "#F08080",
    color: "black",
    width: "150px",
    height: "35px",
    border: "none",
    cursor: "pointer",
    marginRight: "100px",
  },
  icon: {
    position: "relative",
    top: "10px",
    right: "50px",
    cursor: "pointer",
  },
  courseCountInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  courseCountInfoText: {
    marginRight: "60px",
    fontSize: "13px",
  },
  inputContent: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
  },
};
