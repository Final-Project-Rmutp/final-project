
import React from 'react';
import './Datetime.scss';

const Datetime : React.FC = () => {
return (
    <div className="datetime-container">
    <input type="datetime-local" id="datetime" name="datetime" />
    </div>
    );
};

export default Datetime;
