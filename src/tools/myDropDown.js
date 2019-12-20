import React, { Component } from 'react'
import Select from 'react-select'


const MyDropDown = props => {
    const { width, style, options, value, onChange } = props;
    const defaultStyle = {
        width: '${width === undefined ? "100% : width} '
    };
    const userStyle = style === undefined ? {} : style;
    return (
        <Select
            options={options}
            onChange={onChange}
            value={value}
        />
    )


}
export default MyDropDown