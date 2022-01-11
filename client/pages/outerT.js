import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText , FormFeedback, View, ButtonGroup } from "reactstrap";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useMutateOuterTransaction } from "../adapters/user";

export default function ExternalTransfer() {

    const [AccountID, setAccountID] = useState("");
    const [AccountIDMine, setAccountIDMine] = useState("");
    const [Amount, setAmount] = useState("");
    const [Description, setDescription] = useState("");
    const [URL, setURL] = useState("");
    const [accountIDState, setAccountIDState] = useState("");
    const [amountState, setAmountState] = useState("");
    const [URLState, setURLState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const useExternalMutation = useMutateOuterTransaction();


    useEffect(async () => {
      console.log("Mounting!");
      const accountId = localStorage.getItem("accountid");
      setAccountIDMine(accountId);
      console.log(accountId);
    }, []);
  
    /**
     * Checks if the Account ID entered by the user is valid or not.
     * @param {string} value -The account ID of the reciever the user wants to send to.
     */

     const validateAccountID = (value) => {
        let accountIDState;
        if (value.length === 12) {
            accountIDState = "has-success";
        }
        else {
            accountIDState = "has-danger";
        }
        setAccountIDState(accountIDState);
    }
    /**
     * Checks if the Amount entered by the user is not more than 50 as the maximum transaction allowed is 50.
     * @param {string} value -The amount of money the user wants to transfer.
     */

      const validateAmount = (value) => { 
        let amountState; 
        if (value.length>0 && value <= 50) {
            amountState = "has-success"
        }else {
            amountState = "has-danger"
        }
        setAmountState(amountState)
      }

      const validateURL = (value)=>{
        let urlState;
        if (value.length>0 && value !== "default") {
          urlState = "has-success"
      }else {
          urlState = "has-danger"
      }
      setURLState(urlState);
      }


    /**
     * Checks if the Description entered by the user is valid or not.
     * @param {string} value -The description of the transfer.
     */
      const validateDescription = (value) => {
        let descriptionState;
        if (value.length > 3) {
            descriptionState = "has-success";
        }
        else {
            descriptionState = "has-danger";
        }
        setDescriptionState(descriptionState);
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "accountID") {
          validateAccountID(value);
          setAccountID(value);
        }
        
        else if (name === "amount") {
          validateAmount(value);
          setAmount(value);
        }
    
        else if (name === "description") {
          validateDescription(value);
          setDescription(value);
        }
        else if (name === "bankSelect"){
          validateURL(value);
          setURL(value);
        }

       

      }


      const handleSubmit = (event) => {
        event.preventDefault();

        validateAccountID(AccountID);
        validateAmount(Amount);
        validateDescription(Description);
        validateURL(URL);

        if (
          accountIDState==="has-success"&&
          amountState==="has-success"&&
          descriptionState==="has-success" &&
          URLState ==="has-success"
        ) {

          // Call User Register Adapter
          useExternalMutation.mutate(
            {
              "sender_id":AccountIDMine,
              "receiver_id": AccountID,
              "url": URL,
              "amount": Amount,
              "description": Description,
            }
          );
        }
      };


    return ( 
   
      <div className={styles.App}>
      <Button style={{justifyContent: 'right'}} color="primary" className="float-right" onClick={() => {
      window.location.replace("http://localhost:3000/transactions"); }}> Back </Button>
      <h1> Outer Transaction  </h1>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="accountID">Receiver Account ID</Label>
          <Input
            type="number"
            name="accountID"
            id="accountID"
            placeholder="Receiver Account ID"
            valid={accountIDState === "has-success"}
            invalid={accountIDState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>Invalid ID</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="amount"
            valid={amountState === "has-success"}
            invalid={amountState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>The maximum amout to transfer is 50</FormFeedback>
        </FormGroup>

        <FormGroup>
        <Label for="bankSelect">Select a bank</Label>
            <select defaultValue="Choose Bank" onChange={(event) =>setURL(event.target.value)}>
                <option value = "default"> Please Pick A bank </option>
                <option value = "https://safemonii.loca.lt/"> Safemonii </option>
                <option value = "https://solace.loca.lt/"> Solace </option>
                <option value = "https://ironbank.loca.lt/"> Ironbank </option>
                <option value = "https://myfsd.loca.it/"> My Fsd </option>
                <option value = "https://amryinternationalbank.loca.lt/"> Amry International Bank </option>
            </select>
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="example: online payment"
            valid={descriptionState === "has-success"}
            invalid={descriptionState === "has-danger"}
            onChange={handleChange}
          />
          <FormFeedback>Please don't leave it empty.</FormFeedback>
        </FormGroup>

           <Button color = "primary"> Submit</Button>

      </Form>
    </div>
  
  );
      
  };