import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from 'formik';
import { getAccount, getPermissions } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import permissions_data from '../data/permissions.json';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const ModalAuth = (props) => {
  
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [permissionsKey, setPermissionsKey] = useState(localStorage.getItem('apiKey') ?? '');



  const update = (key) => {
    const action = { type: "UPDATE_API_KEY", value: { key: key } };
    props.dispatch(action);
  };

  function listPermissions(){

    return(
      <div className="list_permissions">
        {permissions_data.map((key, index) => {

      
        if(permissionsKey){
          const permission_find = permissionsKey.permissions.some(item => item === key.name);

          if(permission_find){
            return(
              <span><CheckIcon sx={{ color: 'green' }}></CheckIcon>{key.name}</span>
            )
          } else {
            return(
              <span><CloseIcon sx={{ color: '#C62E2D' }}></CloseIcon>{key.name}</span>
            )
          }
        } else {
          return(
            <span><CloseIcon sx={{ color: '#C62E2D' }}></CloseIcon>{key.name}</span>
          )
        }

        

       
         
        })}
    
      </div>
    )
    
  }
  const getPermissionsKey = async (api) => {
    const data = await getPermissions(api)
    setPermissionsKey(data)
  }

  useEffect(() => {
    setError("")
    if(apiKey){
      getPermissionsKey(apiKey)
    }
  },[apiKey])

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

          <Modal.Body className="key_form">
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
                      update(values.key)
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
                {listPermissions()}

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


// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey }) => ({
  apiKey,
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuth);


