
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Icon } from '@iconify/react';

export const SidebarData = [
    {
        title: 'dashboard',
        path: '',
        icon: <Icon icon="flat-color-icons:line-chart" />
    },
    {
        title: 'user',
        path: 'student-list',
        icon: <Icon icon="ph:user-list-fill" color="#3F51B5"  />
    },
    {
        title: 'reserved',
        path: 'reserved-list',
        icon: <Icon icon="grommet-icons:system" color="#00BCD4"  />
    },
    {   
        title: 'room',
        path: 'room-list',
        icon: <Icon icon="cil:room" color="#3F51B5"  />
    },
    {
        title: 'Reprot',
        path: '',
        icon: <Icon icon="fluent-mdl2:report-warning" color="red"  />
    }
]
