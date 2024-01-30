import { Header } from "../components/Header";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Line = ({ type }) => {
    const lineStyle = {
      width: '100%',
      borderBottom: type === 'solid' ? '1px solid black' : '.5px solid gray',
      margin: '0', // Remove any default margin
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
        <Grid>
          {timeSlots.map((time, index) => (
            <Grid item xs={15} key={index}>
              <>
                <Line type={index % 2 === 0 ? 'solid' : 'dots'} />
                <Typography style={styles.gridChild}>{time}</Typography>
              </>
            </Grid>
          ))}
        </Grid>
       </div>
    );
  }
  
  const styles = {
    gridChild: {
      fontSize: '15px', // Adjust the font size as needed
      margin: '11px', // Remove any default margin
      marginLeft: '0%',
    },
  };
