import React, { Component } from 'react'
import Select from 'react-select'


const MyDropDown = props => {
    const {width, style, options,defaultValue}=props;
    const defaultStyle={
        width:'${width === undefined ? "100% : width} '
    };
    const userStyle= style === undefined ? {} : style;
    return(
        <Select options={options} defaultValue={defaultValue}/>
    )

 
}
export default MyDropDown