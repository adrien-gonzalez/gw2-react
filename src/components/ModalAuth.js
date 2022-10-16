import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Formik } from 'formik';
import { getAccount, getPermissions } from '../services/gw2API';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import permissions_data from '../data/permissions.json';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { Formik, Form, Field } from "formik";
import { TextField, InputAdornment } from "@material-ui/core";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const ModalAuth = (props) => {
  
  const [error, setError] = useState(false);
  const [color, setColor] = useState(localStorage.getItem('color') ?? 'default');
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') ?? '');
  const [permissionsKey, setPermissionsKey] = useState(localStorage.getItem('apiKey') ?? '');



  const update = (key) => {
    const action = { type: "UPDATE_API_KEY", value: { key: key } };
    props.dispatch(action);
  };

  const updateColor = (key) => {
    localStorage.setItem('color', key)
    setColor(key)
    const action = { type: "UPDATE_APP_COLOR", value: { color: key } };
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
              <span key={key.name}><CheckIcon sx={{ color: 'green' }}></CheckIcon>{key.name}</span>
            )
          } else {
            return(
              <span key={key.name}><CloseIcon sx={{ color: '#C62E2D' }}></CloseIcon>{key.name}</span>
            )
          }
        } else {
          return(
            <span key={key.name}><CloseIcon sx={{ color: '#C62E2D' }}></CloseIcon>{key.name}</span>
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
  },[apiKey, color])

  function close(){
    setError("")
    props.close()
  }

  
  return (

    <>
      <Modal 
        className= {localStorage.getItem('color') == "dark" ? "darkColor" : "defaultColor"}
        show={props.show} 
        onHide={props.onHide}
        size="sl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Paramètres</Modal.Title>
        </Modal.Header>

          <Modal.Body className="key_form">
          <Formik
       

            initialValues={{ key: '', color: ''}}
            onSubmit={(values, { setSubmitting }) => {
              // alert("values:" + JSON.stringify(values));
              if(values.key != ""){
                getAccount(values.key).then(response=> 
                  { 
                    if(response){
                      localStorage.setItem('apiKey', values.key);
                      setApiKey(values.key)
                      update(values.key)
                      close()
                    } else {
                      const err ="Votre clé n'est pas valide !"
                      setError(err)
                    }
                  })
              } 

              if(values.color != ""){
                updateColor(values.color)
                close()

              }

              setSubmitting(false)
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
            

              <Form className="formApiKey">

               <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="color">
                    Theme Color
                  </InputLabel>
                    <NativeSelect
                        defaultValue={localStorage.getItem('color') == "dark" ? "dark" : "default"}
                        type="text"
                        name="color"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id= 'color'
                      > 
                      <option value={"default"}>Par défaut</option>
                      <option value={"dark"}>Darkmode</option>
                    </NativeSelect>
                </FormControl> 
                

                <Field
                  style={{marginTop: '15px'}}
                  label="Guild Wars 2 API Key"
                  type="text"
                  name="key"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={apiKey}
                  placeholder={apiKey ? 'Modifier votre clé ici' : 'Renseigner votre clé ici'}
                  component={TextField}
                  size="small"
                  id="key"
                  // Mui icons based on Validation
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" style={{ outline: "none" }}>
                        {error && touched.key && (
                          <CloseIcon
                            style={{ color: "red" }}
                            fontSize="default"
                          ></CloseIcon>
                        )}
                        {!error && touched.key && (
                          <CheckIcon
                            style={{ color: "#05cc30" }}
                            fontSize="default"
                          ></CheckIcon>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                    {listPermissions()}


                    <div className="valid_form">
                      <Button  className={localStorage.getItem('color') == "dark" ? "darkColorButton modalButton" : "defaultColorButton modalButton"} onClick={close}>Annuler</Button>
                      <Button  className={localStorage.getItem('color') == "dark" ? "darkColorButton modalButton" : "defaultColorButton modalButton"} type="submit" disabled={isSubmitting}>Valider</Button>
                  </div>
              </Form>
            )}
          </Formik>


        </Modal.Body>
      </Modal>
    </>
  );
};


// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey, appColor }) => ({
  apiKey,
  appColor
});

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuth);


