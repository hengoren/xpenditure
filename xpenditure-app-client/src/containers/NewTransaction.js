import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import LoadingButton from "../components/LoadingButton";
import "./NewTransaction.css";

export default class NewTransaction extends Component {
  constructor(props) {
    super(props);

    // this.file = null;

    this.state = {
      isLoading: null,
      description: "", 
      merchant: "",
      price: "", 
      category: "",
      datePurchased: "",
      paymentType: "" 
    };
  }

  validateForm() {
    return this.state.description.length > 0 &&
            this.state.merchant.length > 0 &&
            this.state.price.length > 0 &&
            this.state.category.length > 0 &&
            this.state.datePurchased.length > 0 &&
            this.state.paymentType.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

//   handleFileChange = event => {
//     this.file = event.target.files[0];
//   }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
        await this.createTransaction({
            description: this.state.description,
            merchant: this.state.merchant,
            price: this.state.price,
            category: this.state.category,
            datePurchased: this.state.datePurchased,
            paymentType: this.state.paymentType
        });

        this.props.history.push('/');
    } catch (e) {
        alert(e);
        this.setState({ isLoading: false });
    }
}
createTransaction(transaction) {
    return API.post('transactions', '/transactions', {
        body: transaction
    });
}

  render() {
    return (
      <div className="NewTransaction">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
                <FormControl
                onChange={this.handleChange}
                value={this.state.description}
                componentClass="textarea"
                />
          </FormGroup>
          <FormGroup controlId="merchant">
            <ControlLabel>Merchant</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.merchant}
                  componentClass="textarea"
                />
          </FormGroup>
          <FormGroup controlId="price">
              <ControlLabel>Price</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.price}
                  componentClass="textarea"
                />
          </FormGroup>
          <FormGroup controlId="category">
              <ControlLabel>Category</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.category}
                  componentClass="select"
                >
                    <option>Select Category</option>
                    <option>Utilities</option>
                    <option>Gas & Transit</option>
                    <option>Groceries</option>
                    <option>Eating Out</option>
                    <option>Entertainment</option>
                    <option>Miscellaneous</option>
                </FormControl>
          </FormGroup>
          <FormGroup controlId="datePurchased">
              <ControlLabel>Date Purchased</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.datePurchased}
                  componentClass="textarea"
                />
          </FormGroup>
          <FormGroup controlId="paymentType">
              <ControlLabel>Payment Type</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.paymentType}
                  componentClass="textarea"
                />
          </FormGroup>
          {/* <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup> */}
          <LoadingButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
