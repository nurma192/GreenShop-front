import React from 'react';

interface MyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

const MyImage: React.FC<MyImageProps> = ({src, ...props}) => {
    return (
        <img src={`${process.env.REACT_APP_API_URL}/${src}`} alt={props.alt || 'Image'} {...props} />
    );
};

export default MyImage;