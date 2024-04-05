import { useState } from 'react';

const Schedule = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthly, setMonthly] = useState(false)

    return (
        <div className='schedule'>
            <h1>{currentDate.toLocaleDateString()}</h1>
            <button onClick={
                () => monthly ? setMonthly(false) : setMonthly(true)
            }>{monthly && <>Week</>}{!monthly && <>Month</>} View</button>
            <div className='scheduleDisplay'>
            {!monthly &&
                <>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                </>
            }
            {monthly &&
                <>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                    <div>
                        <p>TEST</p>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Schedule