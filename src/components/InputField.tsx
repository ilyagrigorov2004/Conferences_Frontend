import { FC } from 'react'

interface Props {
    value: string
    setValue: (value: string) => void
    placeholder?: string
    inputClass?: string
}

const InputField: FC<Props> = ({ value, setValue, placeholder, inputClass }) => {
    return (
        <div className="inputField" style={{ width: '50%', marginLeft: "1em"}}>
            <input value={value} className={inputClass} placeholder={placeholder} onChange={(event => setValue(event.target.value))} style={{ width: '100%' }}/>   
        </div>
    )
}

export default InputField