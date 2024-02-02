// import { Header } from "../components/Header";
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';

// const Line = ({ type, style }) => {
//   const lineStyle = {
//     width: '100%',
//     borderBottom: type === 'solid' ? '1px solid black' : '.5px dotted gray',
//     // margin: '0', // Remove any default margin
//     ...style, // Apply additional styles
//   };

//   return <div style={lineStyle}></div>;
// };

// // Generate component
// export default function Generate() {
//   const timeSlots = [
//     "7:00AM", "8:00AM", "9:00AM", "10:00AM",
//     "11:00AM", "12:00PM", "1:00PM", "2:00PM",
//     "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM"
//   ];

//   return (
//     <div className='generate'>
//       <Header text='Generated Schedules' size='medium'/>  
//       <Grid container spacing={0}>
//         {timeSlots.map((time, index) => (
//           <Grid item xs={12} key={index} style={{ position: 'relative'}}>
//               <Line type='solid' />
//               {index < timeSlots.length - 1 && <Line type='dots' style={styles.dottedLine} />} {/* Render dotted line only between times */}
//               <Typography style={styles.gridChild} component="div">
//                 <div>{time}</div>
//               </Typography>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// const styles = {
//   gridChild: {
//     fontSize: '0.6rem', // Reduce the font size
//     margin: '1vh 0', // Reduce vertical margin
//     position: 'relative', // Make the container relative for absolute positioning
//     top: '-2.2rem',
//   },
//   dottedLine: {
//     borderTop: '1px dotted', // Use borderTop to set the color of the dotted line
//     marginTop: '30px', // Reduce marginTop
//   },
// };


// import React from 'react';
// import {Grid, Typography } from '@mui/material';

// const TimeTable = () => {
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const hoursOfDay = Array.from({ length: 13 }, (_, i) => i + 7); // 7am to 7pm

//   return (
//     <Grid container spacing={1}>
//       {/* Empty cell for the top-left corner */}
//       <Grid item xs={2} />

//       {/* Days of the week (Monday to Saturday) */}
//       {daysOfWeek.map((day, index) => (
//         <Grid key={index} item xs={1} align="center">
//           <Typography variant="h6">{day}</Typography>
// \        </Grid>
//       ))}

//       {/* Time slots (7am to 7pm) */}
//       {hoursOfDay.map((hour) => (
//         <Grid key={hour} container item xs={12} spacing={1}>
//           {/* Time label column */}
//           <Grid item xs={2} align="center">
//             <hr/>
//             <Typography variant="h6">{`${hour % 12 || 12}:00 ${hour >= 12 ? 'pm' : 'am'}`}</Typography>
//           </Grid>

//           {/* Timetable cells for each day */}
//           {daysOfWeek.map((day, index) => (
//             <Grid key={`${day}-${hour}`} item xs={2} align="center">
//               {/* Add your content here, e.g., events or classes */}
//             </Grid>
//           ))}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TimeTable;






// import React, { useState } from 'react';
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// const Calendar = () => {
//     const [config, setConfig] = useState({
//         viewType: "Week"
//     });

//     return (
//         <div>
//             <DayPilotCalendar {...config} />
//         </div>
//     );
// }

// export default Calendar;


// import React, { useState } from 'react';
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// const Calendar = () => {
//     const [config, setConfig] = useState({
//         viewType: "Week",
//         days: 6, // Set the number of days to display (Monday - Saturday)
//         timeHeaders: [
//             { groupBy: "Day", format: "dddd" }, // Display day names (Monday - Sunday)
//             { groupBy: "Hour", format: "h tt", start: 7, end: 20} // Display hours from 7 am to 7 pm
//         ]
//     });

//     return (
//         <div>
//             <DayPilotCalendar {...config} />
//         </div>
//     );
// }

// export default Calendar;


// import React, { useState } from 'react';
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// const Calendar = () => {
//   // State for viewType
//   const [config, setConfig] = useState({
//     viewType: "Resources",
//     columns: [
//       { name: "Monday", id: "R1" },
//       { name: "Tuesday", id: "R2" },
//       { name: "Wednesday", id: "R3" },
//       { name: "Thursday", id: "R4" },
//       { name: "Friday", id: "R5" },
//       { name: "Saturday", id: "R6" },
//     ],
//     timeHeaders: [
//       { groupBy: "Hour", format: "h tt", start: 7, end: 21 } // Display hours from 7 am to 7 pm
//     ]
//   });

//   return (
//     <DayPilotCalendar
//       {...config}
//     />
//   );
// }

// export default Calendar;


// import React, { useState } from 'react';
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// const Calendar = () => {
//   const [config, setConfig] = useState({
//     viewType: "Resources",
//     columns: [
//       { name: "Monday", id: "R1" },
//       { name: "Tuesday", id: "R2" },
//       { name: "Wednesday", id: "R3" },
//       { name: "Thursday", id: "R4" },
//       { name: "Friday", id: "R5" },
//       { name: "Saturday", id: "R6" },
//     ],
//     businessBeginsHour: 13,  // Set the start hour to 7 am
//     businessEndsHour: 14,  // Set the end hour to 7 pm

//   });

//   return (
//     <DayPilotCalendar
//       {...config}
//     />
//   );
// }

// export default Calendar;

import React, { useState, useRef, useEffect } from 'react';
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import './Generate.css'; // Import a separate CSS file for styling

const Calendar = () => {
  const calendarRef = useRef(null);
  const [config, setConfig] = useState({
    viewType: "Resources",
    columns: [
      { name: "Monday", id: "R1" },
      { name: "Tuesday", id: "R2" },
      { name: "Wednesday", id: "R3" },
      { name: "Thursday", id: "R4" },
      { name: "Friday", id: "R5" },
      { name: "Saturday", id: "R6" },
    ],
    startDate: "2024-02-05T07:00:00",
  });

  const calendar = () => {
    return calendarRef.current ? calendarRef.current.control : null;
  };

  const customTimeHeaders = [
    "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"
  ];

  const onBeforeTimeHeaderRender = (args) => {
    const index = args.header.hour - config.businessBeginsHour;
    if (index < 0 || index >= customTimeHeaders.length) {
      args.header.html = ""; // Hide time headers outside the range
    } else {
      args.header.html = customTimeHeaders[index];
    }
  };

  useEffect(() => {
    const currentCalendar = calendar();
    if (currentCalendar) {
      currentCalendar.update();
    }
  }, [config]); // Update the calendar when the config changes

  return (
    <div className="calendar-container">
      <DayPilotCalendar
        {...config}
        ref={calendarRef}
        onBeforeTimeHeaderRender={onBeforeTimeHeaderRender}
      />
    </div>
  );
}

export default Calendar;
