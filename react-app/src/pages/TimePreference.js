import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const firstTimeOption = [
  "All Day", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
];
const secondTimeOption = [
  "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
];


const Days = () => {
  const [days, setDays] = useState([
    { name: 'Monday', checked: true, time: 'All Day' },
    { name: 'Tuesday', checked: true, time: 'All Day' },
    { name: 'Wednesday', checked: true, time: 'All Day' },
    { name: 'Thursday', checked: true, time: 'All Day' },
    { name: 'Friday', checked: true, time: 'All Day' },
    { name: 'Saturday', checked: true, time: 'All Day' },
  ]);
  const [dataModified, setDataModified] = useState(false);

  const handleChecklistChange = (index) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index] = { ...updatedDays[index], checked: !updatedDays[index].checked };
      return updatedDays;
    });
    setDataModified(true);
  };
  
  const handleTimeChange = (index, timeType, time) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index] = { ...updatedDays[index], [timeType]: time };
      return updatedDays;
    });
    setDataModified(true);
  };

  //if data is changed, set expiration date of cookie to 2 months(sandeep said 2)
  // and save data to the cookie whenever it's modified
  useEffect(() => {
    if (dataModified) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getMonth() + 2);

      Cookies.set('userDays', JSON.stringify(days));
      setDataModified(false);
    }
  }, [dataModified, days]);

  return (
    //time preference header
    <div className='time-preference-header'>
      <Header text='Time Preference' size='large' />
      <p style={styles.subheader}> Choose your ideal times for your schedule:</p>
      <hr style={styles.lineFormat} />

      <div className="time-checklist">
          {days.map((day, index) => (
            // 2 CSS styles here. 1 for the condition to gray out a row, the other for grid layout 
            <div key={index} className="timeCheckListRow" style={{ ...(day.checked ? {} : styles.grayedout), ...styles.parent }}>
              <label style={styles.check} >
                <input 
                  type="checkbox"
                  checked={day.checked} 
                  onChange={() => handleChecklistChange(index)}
                  style={styles.checkRow}
                />
                <span style={styles.date}>{day.name}</span>
              </label>

            <span style={styles.from}> from </span>
            {/* first dropdown */}
            <select
              value={day.startTime}
              onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
              disabled={!day.checked}
              style={styles.timeDropdownLeft}> 

            {firstTimeOption.map((option) => (
              <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
            </select>

            <span style={styles.to}> to </span>

            {/* second dropdown */}
            <select 
              value={day.endTime}
              onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
              disabled={!day.checked}
              style={styles.timeDropdownRight}>

              {secondTimeOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
            </select>
            <br/>
          </div>
        ))}
      </div>
      <p style={styles.bottomText}> Other Options:</p>
    </div>
  );
};

const styles = {
  subheader: {
    fontSize: '18px',
    fontFamily: "Inter",
    fontWeight: "450",
  },
  lineFormat: {
    fontSize: "20px",
    fontFamily: "Arial",
    marginTop: "30px",
    marginBottom: "30px"
  },
  bottomText: {
    marginTop: '0px',
    fontSize: '17px',
    fontFamily: "Inter",
    fontWeight: "450"
  },
  grayedout: {
    color: '#888',  
    opacity: '0.6',
  },
  checkRow: {
    marginBottom: '40px',
    transform: 'scale(1.4)', 
  },
  parent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0px',
    fontSize: '20px',
    fontFamily: "Inter",
    fontWeight: "600",
  },
  timeDropdownLeft: {
    fontFamily: "Inter",
    fontSize: "14px",
    textAlign: 'center',
    borderRadius: "4px",
    backgroundColor: "#e0e0e0",
    color: "black",
    fontWeight: "bold",
    height: "35px",
    width: "125px",
    padding: "8px",
    border: "1px solid #ccc",
    marginLeft: '10px',
  },
  timeDropdownRight: {
    fontFamily: "Inter",
    fontSize: "14px",
    textAlign: 'center',
    borderRadius: "4px",
    backgroundColor: "#e0e0e0",
    color: "black",
    fontWeight: "bold",
    height: "35px",
    width: "125px",
    padding: "8px",
    border: "1px solid #ccc",
    marginLeft: '-115px',
  },
  check: {
    flexDirection: 'column'
  },
  date: {
    marginLeft: '80px',
    flexDirection: 'column'
  },
  from: {
    marginLeft: '90px',
    flexDirection: 'column'
  },
  to: {
    marginLeft: '0px',
    flexDirection: 'column',
  },
};

export default Days;