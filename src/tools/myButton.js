import React from 'react'

const MyButton = props => {
    const { text, height, width, style,  type,onClick,className } = props;
    const defaultStyle = {
        height: `${height === undefined ? "100%" : height}`,
        padding: 8,
        width:  `${width === undefined ? "100%" : width}`,
        backgroundColor: "#c7821c",
        color:'white',
        borderRadius:20,
        border:"none",
        outline:'none' 
    };
    const userStyle = style === undefined ? {} : style;

    return(
        <button
            style = {{ ...defaultStyle, ...userStyle,  }}
            type={type}
            onClick={onClick}
            className={className}
        >
            {text}
        </button>
    );
}

export default MyButton