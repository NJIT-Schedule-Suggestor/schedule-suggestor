import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Courses() {
  const [semester, setSemester] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  const [creditCount, setCreditCount] = useState(0);
  const [allCourses, setAllCourses] = useState({ courses: [] });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (searchClass !== "") {
          const response = await axios.get(
            `http://127.0.0.1:5000/courses/${searchClass}`
          );
          const result = response.data;

          setAllCourses(result);
          console.log(result);
        } else {
          setAllCourses([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setCourseCount(selectedCourses.length);
    fetchCourses();
  }, [searchClass]);

  const handleCourseSelect = (option) => {
    setSelectedCourses((prevSelected) => [...prevSelected, option]);
    setAllCourses([]);
    setSearchClass("");
    setHoveredOption(null);
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <input
            style={styles.classInputSearch}
            type="text"
            placeholder="Search For Class"
            value={searchClass}
            onChange={(event) => setSearchClass(event.target.value)}
          />
          {allCourses.length !== 0 && (
            <div style={styles.dropdownSelect}>
              {allCourses.courses.map((option, index) => (
                <React.Fragment key={option}>
                  <option
                    value={option}
                    onClick={() => handleCourseSelect(option)}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        hoveredOption === option ? "#e0e0e0" : "white",
                    }}
                  >
                    {option}
                  </option>
                  {index < allCourses.courses.length - 1 && (
                    <div style={{ borderBottom: "1px solid #ddd" }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

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
      <div>
        <p>Selected Courses:</p>
        {selectedCourses.map((course) => (
          <div key={course}>{course}</div>
        ))}
      </div>
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
    right: "45px",
    cursor: "pointer",
  },
  courseCountInfo: {
    display: "flex",
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
  dropdownSelect: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "350px",
    border: "1px solid #ccc",
    zIndex: 1,
    maxHeight: "200px",
    overflowY: "auto",
  },
};
