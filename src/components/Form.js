import React from 'react';
import './Form.css';

const Form = ({value1, value2, onChange, onSubmit, onKeyPress}) => {
    return (
        <div className="form">
            <input value={value1} onChange={onChange} onKeyPress={onKeyPress} name="title" placeholder="이름"/>
            <input value={value2} onChange={onChange} onKeyPress={onKeyPress} name="index" placeholder="고유번호" type="number"/>
            <div className="create-button" onClick={onSubmit}>
                추가
            </div>
        </div>
    );
};

export default Form;