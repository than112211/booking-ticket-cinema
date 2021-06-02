import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './trailer.scss'

Trailer.propTypes = {
    toggleTrailer: PropTypes.func,
    modalTrailer: PropTypes.bool,
};

function Trailer(props) {
    const {video,toggleTrailer,modalTrailer} = props
    
    return (
        <div className="trailer">
            <Modal isOpen={modalTrailer} toggle={toggleTrailer} className="modal__trailer">
                <ModalHeader toggle={toggleTrailer}>Trailer</ModalHeader>
                <ModalBody>
                    <iframe allowFullScreen src={video} frameborder="0"></iframe>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Trailer;