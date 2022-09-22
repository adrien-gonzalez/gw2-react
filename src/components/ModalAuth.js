import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from 'formik';
import { getAccount } from '../services/gw2API';
import React, { useState, useEffect } from 'react';


const ModalAuth = (props) => {
  
  const [error, setError] = useState("");

  useEffect(() => {
    setError("")
  },[])

  function close(){
    setError("")
    props.close()
  }

  return (

    <>
      <Modal 
        show={props.show} 
        onHide={props.onHide}
        size="sl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Clé API</Modal.Title>
        </Modal.Header>

          <Modal.Body>
          <Formik
            initialValues={{ key: ''}}
            validate={values => {
              const errors = {};
              if (!values.key) {
                errors.key = "Veuillez renseigner votre clé !";
              } 
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                getAccount(values.key).then(response=> 
                  { 
                    if(response){
                      setSubmitting(false);

                    } else {
                      const err ="Votre clé n'est pas valide !"
                      setError(err)
                      setSubmitting(false);
                    }
                  })

            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="key"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.key}
                />
                
                
                <span className="input_error">{errors.key || error}</span>
                <div className="valid_form">
                  <Button onClick={close}>Annuler</Button>
                  <Button type="submit" disabled={isSubmitting}>Valider</Button>
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuth;
