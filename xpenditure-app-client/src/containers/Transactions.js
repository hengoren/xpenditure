import React, { Component } from "react";
import { API } from "aws-amplify"
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoadingButton from "../components/LoadingButton";
import "./Transactions.css";

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      transaction: null,
      description: "", 
      merchant: "",
      price: "", 
      category: "",
      datePurchased: "",
      paymentType: "" 
    };
  }

  async componentDidMount() {
    try {
      const transaction = await this.getTransaction();
      const { description, merchant, price, category, datePurchased, paymentType} = transaction;

      this.setState({
        transaction,
        description,
        merchant,
        price,
        category,
        datePurchased,
        paymentType
      });
    } catch (e) {
      alert(e);
    }
  }

  getTransaction() {
    return API.get("transactions", `/transactions/${this.props.match.params.id}`);
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
  
  saveTransaction(transaction) {
    return API.put("transactions", `/transactions/${this.props.match.params.id}`, {
      body: transaction
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await this.saveTransaction({
        description: this.state.description,
        merchant: this.state.merchant,
        price: this.state.price,
        category: this.state.category,
        datePurchased: this.state.datePurchased,
        paymentType: this.state.paymentType
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  deleteTransaction() {
    return API.del("transactions", `/transactions/${this.props.match.params.id}`);
  }
  
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });
  
    try {
      await this.deleteTransaction();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }
  
  render() {
    return (
      <div className="Transactions">
        {this.state.transaction &&
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
              <LoadingButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoadingButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
  
}
