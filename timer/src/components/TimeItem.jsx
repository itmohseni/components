import NextTime from "./nextTime";

const TimeItem = ({ value, sendTime, max }) => {


    const addNumber = () => {
        sendTime((value + 1) % (max + 1));
    }

    const SubtractNumber = () => {
        sendTime(value === 0 ? max : value - 1);
    }
    return (
        <div className='timeItem'>

            <svg onClick={SubtractNumber} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="arrowBtn">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

            <NextTime number={value - 1 === -1 ? max : value - 1} />
            <p className='currentNumber'>{value}</p>
            <NextTime number={value + 1 === 10 ? max : value + 1} />

            <svg onClick={addNumber} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="arrowBtn">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

        </div>
    );
}

export default TimeItem;
