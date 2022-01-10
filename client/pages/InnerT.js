import React, { useState } from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import styles from "../styles/Home.module.css";
import {
    Form,
    FormGroup,
    Button,
} from "reactstrap";
import { useMutateInnerTransaction } from "../adapters/user";

export default function InnerT() {
  const[amount, setAmount] = useState("");
  const[accountid, setAccountid] = useState("");

  const[amountState, setAmountState] = useState("");
  const[accountidState, setAccountidState] = useState("");

  const useTransferMutation = useMutateInnerTransaction();

  const validateAmount = (value) =>{
    let amountState;
    if(value == 0){
      amountState = "has-success";
    }else{
      amountState = "has-danger";
    }
    setAmountState(amountState);
  }

  const validateAccountid = (value) =>{
    let accountidState;
    if(value.length == 11){
      accountidState = "has-success";
    }else{
      accountidState = "has-danger";
    }
    setAccountidState(accountidState);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "amount") {
      validateAmount(value);
      setAmount(value);
    }else if (name === "accountid") {
      validateAccountid(value);
      setAccountid(value);
    } 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAmount(amount);
    validateAccountid(accountid);
    if(accountidState==="has-success" && amountState==="has-success"){
      useTransferMutation.mutate(
        {
          "from_To": "Bank",
          "Display_date": new Date().toDateString(),
          "debit": 1,
          "credit": 0,
          "amount": amount,
          "accountid": window.localStorage.getItem("accountid"),
        }); 
    } 
  }
  return (
    <div className={styles.App}>
      <Button style={{justifyContent: 'right'}} color="primary" className="float-right" onClick={() => {
      window.location.replace("http://localhost:3000/transactions"); }}> Back </Button>
      <br></br>
      <h2>Inner Transactions</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup>
        <Label className={styles.label} for="accountid">
          Reciver Account ID 
        </Label>
        <Input type="text"
          name="accountid"
          id="accountid"
          placeholder="Enter The Reciver Account ID"
          onChange={handleChange}
          valid={accountidState === "has-success"}
          invalid={accountidState === "has-danger"}
        />
        <FormFeedback>Account ID size must be 11</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label className={styles.label} for="amount">
          Amount 
        </Label>
        <Input type="Number"
          name="amount"
          id="amount"
          placeholder="Enter The Amount"
          onChange={handleChange}
          valid={amountState === "has-success"}
          invalid={amountState === "has-danger"}
        />
        <FormFeedback>Please enter the correct value</FormFeedback>
        </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
        <Form className={styles.form} onSubmit={handleSubmit}>
        </Form>
        <Button color="outline-primary"  onClick={() => {      
             window.location.replace("http://localhost:3000");    
        }} >Return to Accounts</Button>
      </div>
    );
}
  
  
  