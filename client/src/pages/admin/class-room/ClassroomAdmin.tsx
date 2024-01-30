// ClassRoomAdmin.tsx
import UserService, { ClassSchedule } from '../../../auth/service/UserService';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const TimetableContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const TimetableHeader = styled.h1`
  font-size: 24px;
`;

const TimetableTable = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 30px auto;
`;

const TimetableTh = styled.th`
    color:black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
`;

const TimetableTd = styled.td`
    color:black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
`;


const ClassRoomAdmin: React.FC = () => {
    const [timetableData, setTimetableData] = useState<ClassSchedule[]>([]);
    useEffect(() => {
        const fetchSchedule = async () => {
          try {
            const response = await UserService.getClassSchedule();
            setTimetableData(response);
          } catch (error) {
            console.error('Error fetching schedule:', error);
          }
        };
    
        fetchSchedule();
      }, []);
    return (
        <TimetableContainer>
        <TimetableHeader>TIME TABLE</TimetableHeader>
        <TimetableTable>
        <thead>
            <tr>
            <TimetableTh><b>Day/Period</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Monday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Tuesday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Wednesday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Thursday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Friday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Saturday</b></TimetableTh>
            <TimetableTh colSpan={3}><b>Sunday</b></TimetableTh>
            </tr>
        </thead>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>08:00 - 09:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>09:00 - 10:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>10:00 - 11:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>11:00 - 12:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((classItem) => (
                    <p key={classItem?.subject_name}>
                    {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                        <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                    )}
                    </p>
                ))}
                {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>12:00 - 13:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>13:00 - 14:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
        <tr>
            <TimetableTd rowSpan={3}><b>14:00 - 15:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
            </TimetableTd>
        </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>15:00 - 16:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>16:00 - 17:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>17:00 - 18:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((classItem) => (
                <p key={classItem?.subject_name}>
                {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                    <b className="text-danger">{`${classItem.fullname} - ${classItem.subject_name}`}</b>
                )}
                </p>
            ))}
            {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
            </TimetableTd>
            </tr>
        </tbody>
        </TimetableTable>
        </TimetableContainer>
    );
  };

export default ClassRoomAdmin;
// function formatTimeThai(time: string) {
//     const [hour, minute] = time.split(':').map(Number);
//     const formattedHour = String(hour).padStart(2, '0');
//     const formattedMinute = String(minute).padStart(2, '0');
//     return `${formattedHour}:${formattedMinute}`;
// }