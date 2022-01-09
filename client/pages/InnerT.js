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

import { useMutateTransaction } from "../adapters/user";

export default function InnerT() {
    const [recieverAccountId, setrecieverAccountId] = useState("");
    const [amount, setAmount] = useState("");

    const [recieverAccountIdState, setrecieverAccountIdState] = useState("");
    const [amountState, setAmountState] = useState("");

    const useTransferMutation = useMutateTransaction();

    /*const validateReciverAccountId = (value) => {
      let recieverAccountIdState;
      if (value.length > 10) {
        recieverAccountIdState = "has-success";
      }
      else {
        recieverAccountIdState = "has-danger";
      }
      setrecieverAccountIdState(recieverAccountIdState);
    }

    const validateAmount = (value) => {
      let amountState;
      if (value.length > 10) {
        amountState = "has-success";
      }
      else {
        amountState = "has-danger";
      }
      setAmountState(amountState);
    }*/

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "recieverAccountId") {
            //validateReciverAccountId(value);
            setrecieverAccountId(value);
        }else if (name === "amount") {
            //validateAmount(value);
            setAmount(value);
        }

    }


    const handleSubmit = (event) => {
      event.preventDefault();
      //validateAccountId();
      //validateAmountState();
      // validateDescriptionState();
       {
          // Call User Transfer Adapter
          useTransferMutation.mutate(
              {
                  "from_To": recieverAccountId,
                  "Display_date": (new Date()).toDateString(),
                  "debit": 1,
                  "credit": 0,
                  "amount": Number (amount),
                  "accountid": window.localStorage.getItem("accountid")
              }
          );

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
          <Input type="text"
            name="amount"
            id="amount"
            placeholder="Enter  the Amount"
            onChange={handleChange}
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
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
  
  
  