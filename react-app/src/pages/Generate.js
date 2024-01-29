import { Header } from "../components/Header";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Generate() {
    return (
        <div className='generate'>
            <Header text='Generated Schedules' size='large'/>
            <Grid container spacing={2} style={styles.gridParent}>

                <Grid item xs={20}>
                    <Typography><hr></hr> Content for 1st</Typography>
                </Grid>

                <Grid item xs={20}>
                    <Typography>Content for 2nd</Typography>
                </Grid>

                <Grid item xs={20} style={styles.gridChild}>
                    <Typography>Content for 3rd</Typography>
                </Grid>

            </Grid>
        </div>
    )
};


const styles = {
    gridParent: {
        backgroundColor: 'blue',
    },
    gridChild: {
        color: 'red',
        // backgroundColor: 'red',
    },
};