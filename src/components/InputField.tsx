import { FC } from 'react'

interface Props {
    value: string
    valuetype?: string
    placeholder?: string
    inputClass?: string
    setValue: (value: string, valuetype?: string) => void
    date: boolean
}

const InputField: FC<Props> = ({ value, placeholder, inputClass, setValue, valuetype, date}) => {
    return (
        <div className="inputField" style={{ width: '50%' }}>
            <input value={value} className={inputClass} placeholder={placeholder} onChange={(e) => setValue(e.target.value, valuetype)} style={{ width: '100%' }} type={date ? 'date' : 'text'}/>   
        </div>
    );
}

export default InputField
