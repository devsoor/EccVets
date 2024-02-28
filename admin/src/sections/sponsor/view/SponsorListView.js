import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import PhoneIcon from '@mui/icons-material/Phone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { paths } from 'src/routes/paths';

import { getUsers } from 'src/libs/api'

const DatagridStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

export default function SponsorListView() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

    const fetchSponsors = async () => {
      const params = {
          type: 'SPONSOR'
      }
      const sponsors = await getUsers(params);
      if (sponsors) {
          setRows(sponsors);
      }
  }

  useEffect(() => {
      fetchSponsors();
  }, []);

  const handleSponsorView = (e, row) => {
    e.preventDefault();
    navigate(paths.dashboard.user.sponsor.view(row.id));
  }

  const columns = [
      { field: 'fullName', headerName: 'Name', editable: true, width: 150,
        renderCell: (params) => (
            <Tooltip title="Go to user">
                <Button sx={{textDecoration: 'underline', width: 150, display: 'flex', justifyContent: 'flex-start'}} onClick={e=>handleSponsorView(e, params.row)}>
								<Typography variant='subtitle2'>
									{params.row.fullName}
								</Typography>
							</Button>            
            </Tooltip>
        )
      },
      { field: 'emailAddress', headerName: 'Email', editable: true, width: 150 },
      { field: 'phoneNumber', headerName: 'Phone', editable: true, width: 150,
            renderCell: (params) => 
            (
                <Typography variant='subtitle2' sx={{width: 150, display: 'flex', alignItems: 'center'}}>
                  {params.value}
                </Typography>
                
            )

      },
	]

	return (
		<DatagridStyle sx={{ height: 1200, width: '100%' }}>
			{rows &&
          <DataGrid
              rows={rows}
              columns={columns}
              getRowId={row => row.SK}
              slots={{ toolbar: GridToolbar }} 
          />
      }
		</DatagridStyle>
	)
}
