import React, { Component } from 'react';
import axios from "axios";
import './Orders.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount()
    {
        axios.get(`http://localhost:4000/orderlist`)
            .then(res => {
                this.setState({orders: res.data});
            })
    }

    render() {
        return (
            <div className="Orders">
                <header className="Orders-header">
                    <Container>
                        <Row>
                            <Col>
                                {this.state.orders.map(order => {
                                    return OrderItem(order);
                                })}
                            </Col>
                        </Row>
                    </Container>
                </header>
            </div>
        );
    }
}

function OrderItem(order) {
    return (
        <>
            <br/>
            <Card bg="dark" border="warning">
                <Card.Body>
                    <Card.Text>{order.name_and_surname}</Card.Text>
                    <Card.Text>{order.email}</Card.Text>
                    <Card.Text>{order.comment}</Card.Text>
                    <Card.Text>{order.telephone}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
