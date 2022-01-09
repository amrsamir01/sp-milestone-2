import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    FormFeedback,
  } from "reactstrap";
import styles from "../styles/Home.module.css";
import { useState } from "react";
//import { useMutateTransaction } from "../adapters/user";

export default function InnerTrans() {
  const [value,setValue] = useState("");
  const [userid,setUserid] = useState("");
  const [valueState,setValueState] = useState("");
  const [useridState,setUseridState] = useState("");

  //const InnerTransaction = useMutateTransaction();

  const validateValue = (value) => {
    let valueState;
    if (value.length >= 2) {
      valueState = "has-success";
    } else {
      valueState = "has-danger";
    }
    setValueState(valueState);
  };

  const validateUserid = (value) => {
    let useridState;
    if (value.length >= 2) {
      useridState = "has-success";
    } else {
      useridState = "has-danger";
    }
    setUseridState(useridState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "value"){
      validateValue(value);
      setValue(value);
    }else if(name === "userid"){
      validateUserid(value);
      setUserid(value);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    validateUserid(userid);
    validateValue(value);
    if(
      valueState === "has-success" &&
      useridState === "has-success"
    ){
      //InnerTransaction.mutate({
        //"value":value,
        //"userid":userid
      //})
    }
  };
  
  return (
    <div className={styles.App}>
      <h2>Inner Transactions</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="value">
          Value
          </Label>
          <Input
            type="number"
            name="value"
            id="value"
            placeholder="Enter the value"
            onChange={handleChange}
            valid={valueState === "has-success"}
            invalid={valueState === "has-danger"}
          />
          <FormFeedback>
                
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="userid">
          User ID
          </Label>
          <Input
            type="number"
            name="userid"
            id="userid"
            placeholder="Enter the ID"
            onChange={handleChange}
            valid={useridState === "has-success"}
            invalid={useridState === "has-danger"}
          />
          <FormFeedback>
          
          </FormFeedback>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
      <Form className={styles.form} onSubmit={handleSubmit}>

      </Form>
    </div>
  );
}
  