import React, { Component } from 'react'
import Select from 'react-select'


const MyDropDown = props => {
    const { width, style, options, value, onChange,defaultValue,id } = props;
    const defaultStyle = {
        width: '${width === undefined ? "100% : width} '
    };
    const userStyle = style === undefined ? {} : style;
    return (
        <Select
        id={id}
        defaultValue={defaultValue}
            options={options}
            onChange={onChange}
            value={value}
        />
    )


}
export default MyDropDown