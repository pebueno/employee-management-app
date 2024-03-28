import { FC } from 'react';
import { EmployeeType } from './common/types';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { Grid } from '@mui/material';
import Card from '@mui/joy/Card';
import Link from 'next/link';

interface Props {
  employee: EmployeeType;
  onDelete: () => void;
}

const EmployeeCard: FC<Props> = ({ employee, onDelete }) => {

  const formatDate = (dateString: string) => {
    const hireDate = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = hireDate.toLocaleDateString('en-US', options);
    const now = new Date();
    const years = now.getFullYear() - hireDate.getFullYear();
    const months = now.getMonth() - hireDate.getMonth();
    const days = now.getDate() - hireDate.getDate();
    return `${formattedDate} (${years}y - ${months}m - ${days}d)`;
  };

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{
        minWwidth: 320,
        flex: '1 0 auto',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={2}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/mock_image.png"
            alt="Employee Avatar"
          />
        </Grid>
        <Grid item xs={7}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" display="inline">
              {`${employee.firstName} ${employee.lastName}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" display="inline" pl={3}>
              {employee.department}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              {formatDate(employee.hireDate)}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Button variant="contained" color="primary" sx={{ backgroundColor: "#89CC48" }}>
            <Link href={`/detail/${employee.id}`} passHref>
              View Details
            </Link>
          </Button>
          <ClearIcon color="error" sx={{ cursor: 'pointer' }} onClick={onDelete} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default EmployeeCard;