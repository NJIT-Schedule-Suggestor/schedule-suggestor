import { Header } from "../components/Header";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Line = ({ type, style }) => {
  const lineStyle = {
    width: '100%',
    borderBottom: type === 'solid' ? '1px solid black' : '1px dotted gray',
    margin: '0', // Remove any default margin
    ...style, // Apply additional styles
  };

  return <div style={lineStyle}></div>;
};

// Generate component
export default function Generate() {
  const timeSlots = [
    "7:00AM", "8:00AM", "9:00AM", "10:00AM",
    "11:00AM", "12:00PM", "1:00PM", "2:00PM",
    "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM"
  ];

  return (
    <div className='generate'>
      <Header text='Generated Schedules' size='medium'/>  
      <Grid container spacing={0}>
        {timeSlots.map((time, index) => (
          <Grid item xs={12} key={index} style={{ position: 'relative' }}>
            <>
              <Line type='solid' />
              {index < timeSlots.length - 1 && <Line type='dots' style={styles.dottedLine} />} {/* Render dotted line only between times */}
              <Typography style={styles.gridChild} component="div">
                <div>{time}</div>
              </Typography>
            </>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const styles = {
  gridChild: {
    fontSize: '0.6rem', // Reduce the font size
    margin: '1vh 0', // Reduce vertical margin
    position: 'relative', // Make the container relative for absolute positioning
    top: '-2rem',
  },
  dottedLine: {
    borderTop: '1px dotted', // Use borderTop to set the color of the dotted line
    marginTop: '25px', // Reduce marginTop
  },
};



// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';

// const TimeTable = () => {
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const hoursOfDay = Array.from({ length: 12 }, (_, i) => i + 7); // 7am to 7pm

//   return (
//     <Grid container spacing={1}>
//       {/* Empty cell for the top-left corner */}
//       <Grid item xs={1} />

//       {/* Days of the week (Monday to Saturday) */}
//       {daysOfWeek.map((day, index) => (
//         <Grid key={index} item xs={1} component={Paper} align="center">
//           <Typography variant="h6">{day}</Typography>
//         </Grid>
//       ))}

//       {/* Time slots (7am to 7pm) */}
//       {hoursOfDay.map((hour) => (
//         <React.Fragment key={hour}>
//           {/* Time label column */}
//           <Grid item xs={7} component={Paper} align="left">
//             <Typography variant="h6">{`${hour}:00`}</Typography>
//           </Grid>

//           {/* Timetable cells for each day */}
//           {daysOfWeek.map((day, index) => (
//             <Grid key={`${day}-${hour}`} item xs={2} component={Paper} align="top">
//               {/* Add your content here, e.g., events or classes */}
//             </Grid>
//           ))}
//         </React.Fragment>
//       ))}
//     </Grid>
//   );
// };

// export default TimeTable;


// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';

// const TimeTable = () => {
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const hoursOfDay = Array.from({ length: 12 }, (_, i) => i + 7); // 7am to 7pm

//   return (
//     <Grid container spacing={1}>
//       {/* Empty cell for the top-left corner */}
//       <Grid item xs={2} />

//       {/* Days of the week (Monday to Saturday) */}
//       {daysOfWeek.map((day, index) => (
//         <Grid key={index} item xs={2} component={Paper} align="center">
//           <Typography variant="h6">{day}</Typography>
//         </Grid>
//       ))}

//       {/* Time slots (7am to 7pm) */}
//       {hoursOfDay.map((hour) => (
//         <Grid key={hour} container item xs={12} spacing={1}>
//           {/* Time label column */}
//           <Grid item xs={2} component={Paper} align="center">
//             <Typography variant="h6">{`${hour}:00`}</Typography>
//           </Grid>

//           {/* Timetable cells for each day */}
//           {daysOfWeek.map((day, index) => (
//             <Grid key={`${day}-${hour}`} item xs={2} component={Paper} align="center">
//               {/* Add your content here, e.g., events or classes */}
//             </Grid>
//           ))}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TimeTable;