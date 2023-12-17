
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Icon } from '@iconify/react';

export const SidebarData = [
    {
        title: 'dashboard',
        path: '',
        icon: <Icon icon="flat-color-icons:line-chart"width="18" height="18" />
    },
    {
        title: 'user',
        path: 'student-list',
        icon: <Icon icon="ph:user-list-fill" color="#3F51B5" width="18" height="18" />
    },
    {
        title: 'reserved',
        path: 'reserved-list',
        icon: <Icon icon="grommet-icons:system" color="#00BCD4" width="18" height="18" />
    },
    {   
        title: 'room',
        path: 'room-list',
        icon: <Icon icon="cil:room" color="#3F51B5" width="18" height="18" />
    },
    {
        title: 'Reprot',
        path: '',
        icon: <Icon icon="fluent-mdl2:report-warning" color="red" width="18" height="18" />
    }
]
