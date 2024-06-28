export const Description = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Reason for Appointment: {req && <span className="required">*</span>}</label>
            <textarea
                rows={10}
                cols={50}
                maxLength={2000}
                value={val}
                onChange={changeFn}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const EmailAddress = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Email Address: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                onChange={changeFn}
                value={val}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const FirstName = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>First Name: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                onChange={changeFn}
                title="Letters only"
                pattern="[a-zA-Z]+"
                value={val}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const LastName = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Last Name: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                onChange={changeFn}
                title="Letters only"
                pattern="[a-zA-Z]+"
                value={val}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const PhoneNumber = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Phone Number: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                onChange={changeFn}
                pattern='[0-9]{10}'
                placeholder='xxxxxxxxxx'
                title="xxxxxxxxxx"
                required={req && 'required'}
                value={val}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const VehicleMake = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Vehicle Make: {req && <span className="required">*</span>}</label>
            <select
                value={val}
                onChange={changeFn}
                className={error ? 'error' : ''}>

                <option value="" disabled>--Please choose--</option>
                <option value="Audi">Audi</option>
                <option value="VW">VW</option>
                <option value="BMW">BMW</option>

            </select>
        </>
    )
}

export const VehicleModel = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Vehicle Model: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                value={val}
                title="Letters and numbers only"
                pattern="[a-zA-Z0-9 ]+"
                onChange={changeFn}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const VehicleYear = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Vehicle Year: {req && <span className="required">*</span>}</label>
            <input
                type="number"
                min="1800"
                max="2500"
                value={val}
                onChange={changeFn}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const VinEntry = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>VIN: {req && <span className="required">*</span>}</label>
            <input
                type="text"
                value={val}
                title="17 letters and numbers only"
                pattern="[a-zA-Z0-9]{17}"
                onChange={changeFn}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const Password = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Password: {req && <span className="required">*</span>}</label>
            <input
                type="password"
                value={val}
                onChange={changeFn}
                className={error ? 'error' : ''}
            />
        </>
    )
}

export const AccessLevel = ({ val, req, error, changeFn }) => {
    return (
        <>
            <label>Access Level: {req && <span className="required">*</span>}</label>
            <select
                defaultValue={val ? val : 0}
                onChange={changeFn}
                className={error ? 'error' : ''}>

                <option value={0}>Customer</option>
                <option value={1}>Staff</option>
                <option value={2}>Administrator</option>

            </select>
        </>
    )
}