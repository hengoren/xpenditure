import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      isLoading: true,
      transactions: []
    };
  }


  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const allTransactions = await this.allTransactions();
      this.setState({ transactions: allTransactions });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  allTransactions() {
    return API.get("transactions", "/transactions");
  }

  renderAllTransactionsList(transactions) {
    return [{}].concat(transactions).map(
      (transaction, i) =>
        i !== 0
          ? <LinkContainer
              key={transaction.transactionId}
              to={`/transactions/${transaction.transactionId}`}
            >
              <ListGroupItem header={transaction.description}>
                {"Created: " + new Date(transaction.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/transactions/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Add a transaction 
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  

  renderLander() {
    return (
      <div className="lander">
        <h1>xpenditure</h1>
        <p>An app for tracking spending</p>
      </div>
    );
  }

  renderTransactions() {
    return (
      <div className="transactions">
        <PageHeader>Your Transactions</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderAllTransactionsList(this.state.transactions)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTransactions() : this.renderLander()}
      </div>
    );
  }
}
