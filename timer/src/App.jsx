import { useState, useEffect } from 'react';
import TimeItem from './components/TimeItem';

const App = () => {
    const [onemin, setonemin] = useState(0);
    const [tenmin, settenmin] = useState(0);
    const [tensecend, settensecend] = useState(0);
    const [onesecend, setonesecend] = useState(0);

    const [status, setStatus] = useState("stop");

    // شروع تایمر
    const startTimer = () => {
        if (status === "stop") setStatus("run");
    };

    // منطق تایمر
    useEffect(() => {
        if (status !== "run") return;

        const timer = setInterval(() => {
            // مجموع زمان به دقیقه/ثانیه
            let totalSeconds =
                (tenmin * 10 + onemin) * 3600 +
                (tensecend * 10 + onesecend) * 60;

            if (totalSeconds <= 0) {
                clearInterval(timer);
                setStatus("stop");
                return;
            }

            totalSeconds -= 60; // کم کردن یک دقیقه

            // محاسبه دوباره ساعت و دقیقه
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);

            settenmin(Math.floor(hours / 10));
            setonemin(hours % 10);
            settensecend(Math.floor(minutes / 10));
            setonesecend(minutes % 10);
        }, 1000);

        return () => clearInterval(timer);
    }, [status, tenmin, onemin, tensecend, onesecend]);


    return (
        <>
            <div className='contaier'>
                <div className='chooseTime'>
                    {/* Dehgan Clock */}
                    <TimeItem value={tenmin} sendTime={settenmin} max={9} />
                    {/* one hour */}
                    <TimeItem value={onemin} sendTime={setonemin} max={9} />
                    <p className='doted'>:</p>
                    {/* tens of minutes */}
                    <TimeItem value={tensecend} sendTime={settensecend} max={5} />
                    {/* one minute */}
                    <TimeItem value={onesecend} sendTime={setonesecend} max={9} />
                </div>

                <button onClick={startTimer} className='startBtn'>start</button>


            </div>

        </>
    );
}

export default App;
