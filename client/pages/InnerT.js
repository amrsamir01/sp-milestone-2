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
  const [accountId,setAccountId] = useState("");

  const [valueState,setValueState] = useState("");
  const [accountIdState,setAccountIdState] = useState("");

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

  const validateAccountId = (value) => {
    let accountIdState;
    if (value.length >= 2) {
        accountIdState = "has-success";
    } else {
        accountIdState = "has-danger";
    }
    setAccountIdState(accountIdState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "value"){
      validateValue(value);
      setValue(value);
    }else if(name === "accountId"){
      validateAccountId(value);
      setAccountId(value);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    validateAccountId(accountId);
    validateValue(value);
    if(
      valueState === "has-success" &&
      accountIdState === "has-success"
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
          <Label className={styles.label} for="accountid">
          Account ID
          </Label>
          <Input
            type="number"
            name="accountid"
            id="accountid"
            placeholder="Enter the Account ID"
            onChange={handleChange}
            valid={accountIdState === "has-success"}
            invalid={accountIdState === "has-danger"}
          />
          <FormFeedback>
          
          </FormFeedback>
        </FormGroup>
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
        <Button color="primary">Submit</Button>
      </Form>
      <Form className={styles.form} onSubmit={handleSubmit}>

      </Form>
    </div>
  );
}
  