// import React from 'react';
// import './Generate.css';


// const YourTimetable = () => {
//   const generateTimeRows = () => {
//     const rows = [];
//     for (let hour = 7; hour <= 19; hour++) {
//       rows.push(
//         <React.Fragment key={`row-${hour}`}>
//           <tr className={`sv-grid-row ${hour % 2 === 0 ? 'even' : 'odd'}`} data-time={`${hour}:00 am`}>
//             <td className={`sv-grid-col sv-grid-cell time-label`}>{`${hour}:00 am`}</td>
//             <td className={`sv-grid-col sv-grid-cell sv-day-2 sv-first-col`}></td>
//             <td className={`sv-grid-col sv-grid-cell sv-day-3`}></td>
//             <td className={`sv-grid-col sv-grid-cell sv-day-4`}></td>
//             <td className={`sv-grid-col sv-grid-cell sv-day-5`}></td>
//             <td className={`sv-grid-col sv-grid-cell sv-day-6`}></td>
//           </tr>
//           {hour !== 19 && (
//             <tr className={`sv-grid-row dotted-line`} key={`dotted-line-${hour}`}>
//               <td colSpan="7" className={`sv-grid-col dotted-line`}></td>
//             </tr>
//           )}
//         </React.Fragment>
//       );
//     }
//     return rows;
//   };

//   return (
//     <table className="sv-grid-table">
//       <colgroup>
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
//         <col className="sv-body-tbl-col" />
        
//       </colgroup>
//       <thead>
//         <tr className="sv-grid-hdr-row">
//           <th className="sv-grid-col sv-col-hdr sv-day-2 sv-first-col">
//             <span className="sv-grid-col-label">Monday</span>
//           </th>
//           <th className="sv-grid-col sv-col-hdr sv-day-3">
//             <span className="sv-grid-col-label">Tuesday</span>
//           </th>
//           <th className="sv-grid-col sv-col-hdr sv-day-4">
//             <span className="sv-grid-col-label">Wednesday</span>
//           </th>
//           <th className="sv-grid-col sv-col-hdr sv-day-5">
//             <span className="sv-grid-col-label">Thursday</span>
//           </th>
//           <th className="sv-grid-col sv-col-hdr sv-day-6">
//             <span className="sv-grid-col-label">Friday</span>
//           </th>
//           <th className="sv-grid-col sv-col-hdr sv-day-7">
//             <span className="sv-grid-col-label">Saturday</span>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {generateTimeRows()}
//       </tbody>
//     </table>
//   );
// };

// export default YourTimetable;









// import React from 'react';
// import './Generate.css'; // Import your stylesheet for styling

// const YourScheduleComponent = () => {
//   // You can customize the width, height, and other styles in your CSS file
//   const timeSlots = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

//   return (
//     <div className="schedule-container">
//       <div className="time-column">
//         {timeSlots.map((time, index) => (
//           <div key={index} className="time-label">
//             {time}
//           </div>
//         ))}
//       </div>
//       <div className="schedule-grid">
//         <table>
//           <thead>
//             <tr>
//               <th>Monday</th>
//               <th>Tuesday</th>
//               <th>Wednesday</th>
//               <th>Thursday</th>
//               <th>Friday</th>
//               <th>Saturday</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Add rows for each time slot */}
//             {timeSlots.map((time, index) => (
//               <tr key={index}>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             ))}
//             {/* Add more rows as needed */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default YourScheduleComponent;
import React from 'react';
import './Generate.css'; // Import your stylesheet for styling

const YourScheduleComponent = () => {
  // You can customize the width, height, and other styles in your CSS file
  const timeSlots = ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  return (
    <div className="schedule-container">
      <div className="time-column">
        {timeSlots.map((time, index) => (
          <div key={index} className="time-label">
            {time}
          </div>
        ))}
      </div>
      <div className="schedule-grid">
        <table>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <React.Fragment key={index}>
                <tr className={`sv-grid-row ${index % 2 === 0 ? 'even' : 'odd'}`} data-time={time}>
                  {Array.from({ length: 6 }).map((_, dayIndex) => (
                    <td key={dayIndex} className={`sv-grid-col sv-grid-cell sv-day-${dayIndex + 2} ${dayIndex === 0 ? 'sv-first-col' : ''}`}></td>
                  ))}
                </tr>
                {index !== timeSlots.length - 1 && (
                  <tr className={`sv-grid-row dotted-line`} key={`dotted-line-${index}`}>
                    {Array.from({ length: 6 }).map((_, dayIndex) => (
                      <td key={dayIndex} colSpan="1" className={`sv-grid-col dotted-line`}></td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourScheduleComponent;
