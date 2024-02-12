
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Icon } from '@iconify/react';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: 'dashboard',
        name:'Dashboard',
        icon: <Icon icon="flat-color-icons:line-chart" />
    },
    {
        title: 'User',
        path: 'student-list',
        name:'StudentList',
        icon: <Icon icon="ph:user-list-fill" color="#3F51B5"  />
    },
    {
        title: 'Classroom',
        path: 'classroom-list',
        name:'ClassroomList',
        icon: <Icon icon="healthicons:i-training-class"  color="#0B60B0" />
    },
    {
        title: 'Reserved',
        path: 'reserved-list',
        name:'ReservedList',
        icon: <Icon icon="grommet-icons:system" color="#00BCD4"  />
    },
    {   
        title: 'Room',
        path: 'room-list',
        name:'RoomList',
        icon: <Icon icon="cil:room" color="#3F51B5"  />
    },
    {   
        title: 'Subject',
        path: 'subject-list',
        name:'SubjectList',
        icon: <Icon icon="cil:room" color="#3F51B5"  />
    },
    {
        title: 'Report',
        path: 'report-list',
        name:'ReportList',
        icon: <Icon icon="fluent-mdl2:report-warning" color="red"  />
    }
]
