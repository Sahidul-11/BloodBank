import { Card } from 'flowbite-react';
import React from 'react';

const ContentCard = ({blog ,refetch}) => {
    const {title, avatar, email, content, status } = blog
    return (
        <Card
            className="max-w-sm"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={avatar}
        >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> <span className='underline'>Title :</span> <br />
                 {title}
                </h5>
            
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white"> <span className='underline text-xl'>Content :</span> <br />
                {content}</span>
             
            </div>
            <div><span className='text-xl font-bold underline'>Status :</span><span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {status? "Published" : "Draft"}
        </span></div>
        </Card>
    );
};

export default ContentCard;
