
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
// import { Icon } from '@iconify/react';

export const UserSidebarData = [
    {
        isShow: true,
        title: 'Reservation',
        path: 'room-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:reservation-orders" color="#235726" />
    },
    {
        isShow : localStorage.getItem('type') === 'teacher',
        title: 'Classroom',
        path: 'classroom-user',
        icon:''
        // icon: <Icon icon="ph:user-list-fill" color="#3F51B5"  />
    },
    {
        isShow: true,
        title: 'Status',
        path: 'status-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:sync-status-solid" color="#0077B2" />
    },
    {
        isShow: true,
        title: 'Report',
        path: 'report-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:report-warning" color="red"  />
    }
]
