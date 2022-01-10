import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import styles from "../styles/Home.module.css";
import {
    Form,
    FormGroup,
    Button,
} from "reactstrap";
import { useMutateInnerTransaction } from "../adapters/user";

export default function InnerT() {
    const [amount, setAmount] = useState("");

    const useTransferMutation = useMutateInnerTransaction();

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "recieverAccountId") {
            setrecieverAccountId(value);
        }else if (name === "amount") {
            setAmount(value);
        }

    }


    const handleSubmit = (event) => {
      event.preventDefault();
       {
          useTransferMutation.mutate(
              {
                "from_To": "Bank",
                "Display_date": new Date().toDateString(),
                "debit": 1,
                "credit": 0,
                "amount": amount,
                "accountid": window.localStorage.getItem("accountid"),
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
          <Label className={styles.label} for="accountid">
            Reciver Account ID 
          </Label>
          <Input type="text"
            name="accountid"
            id="accountid"
            placeholder="Enter The Reciver Account ID"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="amount">
            Amount 
          </Label>
          <Input type="Number"
            name="amount"
            id="amount"
            placeholder="Enter  the Amount"
            onChange={handleChange}
          />
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
  
  
  