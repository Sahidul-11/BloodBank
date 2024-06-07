
const Title = ({header , title}) => {
    return (
        <div className='text-center text-white'>
            <h1 className=" text-2xl md:text-4xl my-8">{header}</h1>
           <p>{title}</p>
        </div>
    );
};

export default Title;