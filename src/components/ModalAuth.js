import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from 'formik';
import { getAccount } from '../services/gw2API';
import React, { useState, useEffect } from 'react';


const ModalAuth = (props) => {
  
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');

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
                      localStorage.setItem('apiKey', values.key);
                      setApiKey(values.key)
                      close()
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
                  type={apiKey ? 'text' : 'hidden'}
                  disabled={true}
                  className="actuel_key"
                  value={apiKey}
                  placeholder="Renseigner votre clé ici"
                /> 

                <input
                  type="text"
                  name="key"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.key}
                  placeholder={apiKey ? 'Modifier votre clé ici' : 'Renseigner votre clé ici'}
                /> 


                <span className="input_error">{errors.key || error}</span>
                <div className="valid_form">
                  <Button className="modalButton" onClick={close}>Annuler</Button>
                  <Button  className="modalButton" type="submit" disabled={isSubmitting}>Valider</Button>
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

