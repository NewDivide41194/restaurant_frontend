import React from 'react'
import { fsc } from '../helper/fontControlHelper'
import withMedia from 'react-media-query-hoc/dist/with-media'

const MyLabel = props => {
    const { media } = props;
    const { style, text } = props;
    const defaultStyle = {
        fontSize:"fsc(media,15)",
        color:"#FFFFFF"
    };
    const userStyle = style === undefined ? {} : style;

    return(
        <label
            style={{
                ...defaultStyle,
                ...userStyle,
            }}> {text}
        </label>
    )
}

export default MyLabel