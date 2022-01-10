import React, { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import apiService from "../services/apiService";
import Table from 'react-bootstrap/Table'
import Logout from '../components/Logout';
import styles from "../styles/Home.module.css";
import {
    Form,
    FormGroup,
    Button,
} from "reactstrap";

import { useMutateOuterTransaction } from "../adapters/user";

export default function InnerT() {
  const[accountid, setAccountid] = useState("");
  const[amount, setAmount] = useState("");
  const[description, setDescription] = useState("");

  const[recieverAccountIdState, setAccountidState] = useState("");
  const[amountState, setAmountState] = useState("");
  const[descriptionState, setDescriptionState] = useState("");

  const useTransferMutation = useMutateOuterTransaction();

  const validateAmount = (value) =>{
    let amountState;
    if(value == null){
      amountState = "has-danger";
    }else{
      amountState = "has-success";
    }
    setAmountState(amountState);
  }

  const validateAccountid = (value) =>{
    let accountidState;
    if(value.length == 12){
      accountidState = "has-success";
    }else{
      accountidState = "has-danger";
    }
    setAccountidState(accountidState);
  }

  const validateDescription = (value) =>{
    let descriptionState;
    if(value.length > 0){
      descriptionState = "has-success";
    }else{
      descriptionState = "has-danger";
    }
    setDescriptionState(descriptionState);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "amount") {
      validateAmount(value);
      setAmount(value);
    }else if (name === "accountid") {
      validateAccountid(value);
      setAccountid(value);
    }else if(name === "description"){
      validateDescription(value);
      setDescription(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAmount(amount);
    validateAccountid(accountid);
    validateDescription(description);
    if(accountidState==="has-success" && amountState==="has-success" && description==="has-success"){
      useTransferMutation.mutate(
        {
          "from_To": accountid.toString(),
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
        <h2>Outer Transactions</h2>
        <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="recieverAccountid">
            Reciver Account ID 
          </Label>
          <Input type="text"
            name="recieverAccountid"
            id="recieverAccountid"
            placeholder="Enter Reciver Account ID"
            onChange={handleChange}
            valid={recieverAccountIdState === "has-success"}
            invalid={recieverAccountIdState === "has-danger"}
          />
          
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="amount">
            Amount 
          </Label>
          <Input type="Number"
            name="amount"
            id="amount"
            placeholder="Enter the Amount"
            onChange={handleChange}
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
          />
        </FormGroup>
          <FormGroup>
          <Label className={styles.label} for="description">
            Description 
          </Label>
          <Input type="text"
            name="description"
            id="description"
            placeholder="Enter the description"
            onChange={handleChange}
            valid={descriptionState === "has-success"}
            invalid={descriptionState === "has-danger"}
          />
        </FormGroup>
        
          <Button color="primary">Submit</Button>
        </Form>
        <Form className={styles.form} onSubmit={handleSubmit}>
        </Form>
        <Button color="outline-primary"  onClick={() => {      
             window.location.replace("http://localhost:3000");    
        }} >Return to Sign in</Button>
      </div>
    );
}
  
  
  