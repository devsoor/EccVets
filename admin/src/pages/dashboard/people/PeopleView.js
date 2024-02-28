import React, {useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from 'src/libs/api';

// @mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import ProfileCover from './ProfileCover';
import ProfileHome from './ProfileHome';
import ProfileEvents from './ProfileEvents';
import ProfileSign from './ProfileSign';
import ProfileShirt from './ProfileShirt';

// ----------------------------------------------------------------------

const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'events',
      label: 'Events',
      icon: <Iconify icon="material-symbols:event" width={24} />,
    },
    {
      value: 'sign',
      label: 'Veteran Sign',
      icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    {
      value: 'shirt',
      label: 'Red Shirt',
      icon: <Iconify icon="tabler:shirt" width={24} />,
    },
  ];
  
  // ----------------------------------------------------------------------

export default function PeopleView () {
    const { type, id, role } = useParams();
    const settings = useSettingsContext();

    const [person, setPerson] = useState();
    const [currentTab, setCurrentTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    }

    const fetchPerson = async () => {
      setIsLoading(true);
        const params = {
            type: role
        }
        const person = await getUser(id, params); 
        setPerson(person);
        setIsLoading(false);

    }
    useEffect(() => {
        fetchPerson();
    }, []);
   

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
			<Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
				<CircularProgress color="primary" />
			</Backdrop>
			{person && <>
				<ProfileCover person={person}/>
				<Tabs
					value={currentTab}
					onChange={handleChangeTab}
					sx={{
						width: 1,
						bottom: 0,
						// zIndex: 9,
						p: 2,
						// position: 'absolute',
						bgcolor: 'background.paper',
						[`& .${tabsClasses.flexContainer}`]: {
							pr: { md: 3 },
							justifyContent: {
								sm: 'center',
								md: 'flex-start',
							},
						},
					}}
					>
					{TABS.map((tab) => (
						<Tab  key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
					))}
					</Tabs>
			
				{currentTab === 'profile' && <ProfileHome info={person} />}
			
				{currentTab === 'events' && <ProfileEvents type={type} id={id} />}
			
				{currentTab === 'sign' && <ProfileSign type={role} id={id} />}

				{currentTab === 'shirt' && <ProfileShirt type={role} id={id} />}

			</>
			}
		</Container>
	);
}
    
