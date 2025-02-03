import { FC, useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../assets/css/fonts.css'
import '../assets/css/authorChangeCard.css'

import { updateAuthor, uploadImage, addAuthor } from '../slices/AuthorsSlice';
import { getAuthorsAttrs, useAttrs, setOpenCardId } from '../slices/AttrsSlice';
import { Attrib } from "../slices/AttrsSlice"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Author,  } from '../api/Api';

import { setError} from '../slices/conferenceSlice';
import AuthorsAttrCard from './AuthorAttrCard';

interface AuthorCardProps {
    id?: number
    name?: string
    imageUrl?: string
    department?: string
    status?: string
    description?: string
    birthdate?: string

}

const AuthorChangeCard: FC<AuthorCardProps> = (
    { id, name, imageUrl, department, status, description, birthdate }
) => {
    const [formData, setFormData] = useState<Author>({ author_id: 0, name: '', url: '', department: '', status: '', description: '', birthdate:''});

    const attributes = useAttrs();
    const openCardId = useSelector((state: RootState) => state.attributes.openCardId);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleUpload = async (id: string) => {
        if (!selectedFile) {
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await dispatch(uploadImage({ id, file: selectedFile })).unwrap();
        } catch (error) {
            console.error("Ошибка при загрузке изображения:", error);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSave = async () => {
        if (id) {
            try {
                    dispatch(updateAuthor(formData));
            } catch (error) {
                dispatch(setError(error));
            }
        }else{
            try {
                formData.status='active';
                dispatch(addAuthor(formData));
            } catch (error) {
            dispatch(setError(error));
            }
    }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const toggleAttributes = () => {
        if (openCardId === id) {
            dispatch(setOpenCardId(null));
        } else {
            if (id) 
                dispatch(getAuthorsAttrs({authorId: id}))
            dispatch(setOpenCardId(id));
        }
        console.log(openCardId);
    };

    const onChangeFunc = () => {
        dispatch(getAuthorsAttrs({authorId: id!}))
    }

    useEffect(() => {      
        setFormData({
            author_id: id || 0,
            name: name || '',
            url: imageUrl || '',
            department: department ? department.toString() : '',
            status: status || '',
            description: description || '',
            birthdate: birthdate || ''
        });
    },[dispatch, imageUrl, attributes, openCardId]);

    useEffect(() => {
        if (id) {
            
        }
    }, [attributes, id, dispatch]);

    return (
        
            <Card key={id} className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-row align-items-center'>
                    
                    <div className='d-flex flex-row w-100 h-100 flex-grow'>
                    
                    <Card.Title style={{width: '6em', fontSize: '1.2em'}}>{`Автор №${id || ''}`}</Card.Title>
                    <div style={{ width: '106px', height: '76px'}}>
                        <img className='ms-2'src={formData.url || '/img/no_photo_author.png'} style={{ width: '60px', height: '80px', objectFit: 'cover' }}></img>
                    </div>
                    <Form className='d-flex flex-row flex-grow justify-content-between w-100 ms-1'>
                        <div className='d-flex flex-row flex-wrap'>
                            <Form.Group className='me-2' style={{width: '13em'}} controlId="formType">
                                <Form.Label>ФИО</Form.Label>
                                <Form.Control
                                    type="text"
                                    name = "name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '7em'}}  controlId="formStatus">
                                <Form.Label>Статус</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={formData.status || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                >
                                    <option value="active">Активен</option>
                                    <option value="deleted">Неактивен</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '6em'}} controlId="formPrice">
                                <Form.Label>кафедра</Form.Label>
                                <Form.Control
                                    type="text"
                                    name = "department"
                                    value={formData.department || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2 flex-grow-1' style={{width: '20em'}}>
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    type="text" 
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2 flex-grow-1' style={{width: '8em'}}>
                                <Form.Label>Дата рождения</Form.Label>
                                <Form.Control
                                    type="date" 
                                    name="birthdate"
                                    value={formData.birthdate || ''}
                                    onChange={handleInputChange}
                                    className="form-control2"
                                />
                            </Form.Group>
                            <Form.Group className='me-2' style={{width: '20em'}}>
                                <Form.Label>Выберите изображение</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="form-control2"   
                                />
                            </Form.Group>
                            <Button className='my-btn ' style={{height: '40px', marginTop: '30px'}} onClick={toggleAttributes}>
                                {openCardId === id ? 'Скрыть атрибуты' : 'Показать атрибуты'}
                            </Button>
                        </div>
                        <div className='d-flex flex-row justify-content-end'>
                            {id && (<Button className="me-1" style={{height: '5em', width: '9em'}} variant="outline-danger " onClick={() => handleUpload(id.toString())}>Изменить изображение</Button>)}
                            {id && (<Button  variant="outline-danger "  style={{height: '5em', width: '8em', marginLeft: "10px"}} onClick={handleSave}>Изменить</Button>)}
                            {!id && (<Button  variant="outline-danger "  style={{height: '5em', width: '8em', marginLeft: "10px"}} onClick={handleSave}>Добавить автора</Button>)}
                        </div>
                    </Form>
                    </div>
                </Card.Body>

                {openCardId === id && (
                    <div className={`additional-attributes ${openCardId === id ? 'show' : ''}`}>
                        {attributes.map((attr: Attrib) => (
                            <AuthorsAttrCard
                                key={attr.id}
                                author_id={id || 0}
                                attr_id={attr.attr_id}
                                name={attr.name}
                                value={attr.value}
                                onChange={onChangeFunc}
                            ></AuthorsAttrCard>
                        ))}
                        <AuthorsAttrCard key="new-attr" attr_id={0} onChange={onChangeFunc}></AuthorsAttrCard>
                    </div>
                )}
            </Card>
    )
}


export default AuthorChangeCard