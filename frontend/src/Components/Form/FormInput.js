import React, {useState} from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withTranslation } from 'react-i18next';

class FormInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }

    handlePhoneChange(e) {
        this.setState({telephone: e.target.value})
    }

    handleCommentChange(e) {
        this.setState({comment: e.target.value})
    }

    componentDidMount() {
        axios.get(`http://localhost:4000`)
            .then(res => {
                const orders = res.data;
                this.setState({ orders });
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const order = {
            name: this.state.name,
            email: this.state.email,
            telephone: this.state.telephone,
            comment: this.state.comment
        }

        axios.post('http://localhost:4000', order)
            .then(res => {
                const orders = res.data;
                this.setState({ orders });
            })

    }
    render() {
        const { t } = this.props;
        return (
                <Form  onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicNameSurname">
                        <Form.Label>{t('main.form.name')}</Form.Label>
                        <Form.Control required type="text" name="name" onChange={this.handleNameChange} placeholder="Enter your name and surname" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('main.form.email')}</Form.Label>
                        <Form.Control required type="email" name="email" onChange={this.handleEmailChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('main.form.phone')}</Form.Label>
                        <Form.Control required type="text" name="telephone" onChange={this.handlePhoneChange} placeholder="Phone" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('main.form.comment')}</Form.Label>
                        <Form.Control required type="text" name="comment" onChange={this.handleCommentChange} placeholder="Leave your comment" />
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Send
                    </Button>
                </Form>
        );
    }
}

const MyFormComponent = withTranslation()(FormInput);
export default MyFormComponent;