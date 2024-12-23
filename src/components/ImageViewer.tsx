import React from 'react';
import MyMiniImage from "./ui/MyMiniImage";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

interface Props {
    images: string[]
}

function ImageViewer({images}: Props) {
    const [mainImageId, setMainImageId] = React.useState(0);
    const imageUrl = process.env.REACT_APP_API_URL;

    return (
        <div className={`w-full flex`}>
            <div className="w-1/5 flex flex-col gap-4">
                {images.map((image, index) => (
                    <MyMiniImage key={index} src={`${imageUrl}/${image}`}
                                 className={`cursor-pointer aspect-square ${mainImageId === index && 'border-primary border-2'}`}
                                 onClick={() => setMainImageId(index)}/>
                ))}
            </div>
            <div className="w-4/5 ">
                <div className="w-full aspect-square bg-zinc-50 relative select-none">
                    <button onClick={() => setMainImageId(prevState => prevState - 1)}
                            disabled={images.length === 0 || mainImageId === 0}
                            className={`absolute h-[40px] m-auto cursor-pointer bottom-0 left-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}>
                        <HiChevronLeft size="2rem" color={"white"}/>
                    </button>
                    <button onClick={() => setMainImageId(prevState => prevState + 1)}
                            disabled={images.length === 0 || mainImageId === images.length - 1}
                            className={`absolute h-[40px] m-auto cursor-pointer bottom-0 right-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}>
                        <HiChevronRight size="2rem" color={'white'}/>
                    </button>

                    <img className='w-full h-full object-cover' src={`${imageUrl}/${images[mainImageId]}`}
                         alt="addPhoto-scelet.svg"/>
                </div>
            </div>
        </div>
    );
}

export default ImageViewer;
