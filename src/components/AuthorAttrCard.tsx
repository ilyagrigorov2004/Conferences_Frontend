import { FC, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/css/fonts.css'
import '../assets/css/authorChangeCard.css'
import { addAttribute, editAttribute, deleteAttribute} from '../slices/AttrsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

interface AuthorsAttrCardProps {
    author_id?: number;
    attr_id?: number;
    name?: string;
    value?: string;
    onChange: () => void
}

const AuthorsAttrCard: React.FC<AuthorsAttrCardProps> = ({ author_id,  attr_id, name, value, onChange}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<AuthorsAttrCardProps>({ name: '', value: '', author_id: 0, attr_id: 0, onChange: () => {} });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData({
          ...formData,
          value,
        });
    };

    useEffect(() => {
        
        setFormData({ name: name, value: value, author_id: author_id, attr_id: attr_id, onChange: () => {}  });
    }, [name, value, author_id, attr_id]);

    const handleChangeAttr = () => {
        if(formData.value == '')
            dispatch(editAttribute({ authorId: author_id!, attrId: attr_id!, value: '' }))
        if (formData.value)
            if (formData.value.trim())
                dispatch(editAttribute({ authorId: author_id!, attrId: attr_id!, value: formData.value! }));
        
    }

    const handleDeleteAttr = () => {
        dispatch(deleteAttribute({ attrId: attr_id! })).unwrap().then(() => {
            
            onChange();
        });

    };

    const handleAddAttr = () => {
        if (formData.value)
            if (formData.value.trim())
                {
                    dispatch(addAttribute({ name: formData.value})).unwrap().then(() => {
                        setFormData({
                            ...formData,
                            value: '',
                        })
                        onChange();
                    });
                    
                };
                
    }

    if (attr_id != 0) return (
        <div className='d-flex flex-row'>
            <Form.Group className='me-2 mb-2 d-flex flex-row justify-content-between' style={{ width: '30em', height: '2em' }}>
                <Form.Label className='mx-3 mt-1' style={{ width: '20em', textAlign: 'right' }}>{name}</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.value}
                    className="form-control2"   
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button
                className='my-btn'
                style={{ height: '33px', marginTop: '0px' }}
                onClick={handleChangeAttr}
            >
                Изменить
            </Button>
            <Button
                className='my-btn'
                style={{ height: '33px', marginTop: '0px' }}
                onClick={handleDeleteAttr}
            >
                Удалить
            </Button>
        </div>
    )
    else return(
        <div className='d-flex flex-row'>
            <Form.Group className='me-2 mb-2 d-flex flex-row justify-content-between' style={{ width: '30em', height: '2em' }}>
                <Form.Label className='mx-3 mt-1' style={{ width: '20em', textAlign: 'right' }}>{name}</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.value}
                    className="form-control2"   
                    onChange={handleInputChange}
                    placeholder='Название атрибута'
                />
            </Form.Group>
            <Button
                className='my-btn'
                style={{ height: '33px', marginTop: '0px' }}
                onClick={() => {
                    handleAddAttr();
                }}
            >
                Добавить атрибут
            </Button>
        </div>
    )
    ;
}

export default AuthorsAttrCard;