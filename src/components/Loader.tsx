import { Modal, Spinner } from 'react-bootstrap';

interface Props {
    visible: boolean
}

const Loader: React.FC<Props> = ({ visible}) => {
    return (
        <Modal show={visible} centered>
            <Modal.Body className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                </Spinner>
                <p>Загрузка. Пожалуйста, подождите...</p>
            </Modal.Body>
        </Modal>
    );
};

export default Loader