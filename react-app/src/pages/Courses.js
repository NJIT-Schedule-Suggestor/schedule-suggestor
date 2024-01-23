import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TrashCan from "../components/TrashCan.png";
import axios from "axios";
import Cookies from "js-cookie";

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
        } else {
          setAllCourses([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, [searchClass]);

  useEffect(() => {
    const storedCourses = Cookies.get("Courses");

    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setSelectedCourses(parsedCourses);
      setCourseCount(parseInt(Cookies.get("CourseCount"), 10) || 0);
      setCreditCount(parseInt(Cookies.get("CreditCount"), 10) || 0);
    }
  }, []);

  useEffect(() => {
    if (selectedCourses.length !== 0) {
      Cookies.set("Courses", JSON.stringify(selectedCourses));
      Cookies.set("CourseCount", courseCount);
      Cookies.set("CreditCount", creditCount);
    }
  }, [courseCount, creditCount, selectedCourses]);

  const handleCourseSelect = (option) => {
    // Convert option.Credits to integer
    const optionCredits = parseInt(option.Credits, 10);

    // Check if the option is already in selectedCourses and if the sum of credits is less than 21
    if (
      !selectedCourses.some((course) => course.Course === option.Course) &&
      optionCredits + creditCount < 22
    ) {
      setSelectedCourses((prevSelected) => [...prevSelected, option]);
      setCourseCount((prevSelected) => prevSelected + 1);
      setCreditCount((prevSelected) => prevSelected + optionCredits);
      setAllCourses([]);
      setSearchClass("");
      setHoveredOption(null);
    }
  };

  const handleDeleteCourse = (course) => {
    setCourseCount((prevSelected) => prevSelected - 1);
    setCreditCount(
      (prevSelected) => prevSelected - parseInt(course.Credits, 10)
    );
    setSelectedCourses((prevSelected) =>
      prevSelected.filter((selectedCourse) => selectedCourse !== course)
    );
  };

  const handleViewAllCourses = () => {
    window.open(
      "https://generalssb-prod.ec.njit.edu/BannerExtensibility/customPage/page/stuRegCrseSched",
      "_blank"
    );
  };

  const DisplayInfo = () => {
    return (
      <>
        {selectedCourses.map((course, index) => (
          <div
            style={index % 2 === 0 ? styles.courseList1 : styles.courseList2}
            key={course}
          >
            <p style={styles.courses}>{course.Course}</p>
            <p style={styles.courseTitle}>{course.Title}</p>
            <p style={styles.courseMode}>
              {course.DeliveryModes.map((mode, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ", "}
                  {mode}
                </React.Fragment>
              ))}
            </p>
            <p style={styles.courseCredits}>{course.Credits}</p>
            <div style={styles.trashDelete}>
              <img
                style={styles.trashImage}
                src={TrashCan}
                alt="TrashCan"
                onClick={() => handleDeleteCourse(course)}
              />
            </div>
          </div>
        ))}
      </>
    );
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
                    {option.Course}
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
        <button
          style={styles.classInputSearchButton}
          onClick={handleViewAllCourses}
        >
          View all NJIT Courses
        </button>
        <div style={styles.courseCountInfo}>
          <p style={styles.courseCountInfoText}>Total Course: {courseCount}</p>
          <p style={styles.courseCountInfoText}>Total Credits: {creditCount}</p>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #ddd" }}></div>

      {selectedCourses.length === 0 ? (
        <p style={{ fontSize: "13px", fontWeight: "bold", marginTop: "2vh" }}>
          Please Select Some Courses...
        </p>
      ) : (
        <div>
          <p>Selected Courses</p>
          <div style={styles.courseHeading}>
            <div style={styles.courses}>
              <p>Course</p>
            </div>
            <div style={styles.courseTitle}>
              <p>Title</p>
            </div>
            <div style={styles.courseMode}>
              <p>Delivery Mode</p>
            </div>
            <div style={styles.courseCredits}>
              <p>Credits</p>
            </div>
            <div style={styles.trashDelete}></div>
          </div>
          <DisplayInfo />
        </div>
      )}
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
    fontFamily: "Inter",
    fontSize: "14px",
    top: "100%",
    left: 0,
    width: "350px",
    border: "1px solid #ccc",
    zIndex: 1,
    maxHeight: "200px",
    overflowY: "auto",
  },
  courseHeading: {
    display: "flex",
    flexDirection: "row",
  },
  courseList1: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  courseList2: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  courses: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2vw",
    flex: "1",
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: "bold",
  },
  courseTitle: {
    display: "flex",
    flexDirection: "column",
    flex: "2",
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: "bold",
  },
  courseMode: {
    display: "flex",
    flexDirection: "column",
    flex: "2",
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: "bold",
  },
  courseCredits: {
    display: "flex",
    flexDirection: "column",
    // textAlign: "center",
    flex: "1",
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: "bold",
  },
  trashDelete: {
    display: "flex",
    flexDirection: "column",
    // paddingRight: "1vw",
    flex: "0.25",
    justifyContent: "center",
  },
  trashImage: {
    width: "1vw",
    height: "2vh",
    cursor: "pointer",
  },
};
