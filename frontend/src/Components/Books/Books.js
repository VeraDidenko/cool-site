import React, { Component } from 'react';
import './Books.css';
import MyDetailsComponent from '../Details/Details'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import MyFormComponent from "../Form/FormInput";
import { withTranslation } from 'react-i18next';

class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }

    }

    componentDidMount()
    {
        axios.get(`http://localhost:4000/booklist`)
            .then(res => {
                this.setState({books: res.data});
            })
    }

    render()
    {
        const { t } = this.props;
        return (
            <div className="Books">
                <header className="Books-header">
                    <Container>
                        <Row>
                            <Col sm={{ size: 6}}>
                                {this.state.books.map(book => {
                                    return BookItem(book);
                                })}
                            </Col>
                            <Col sm={{ size: 6, offset: 2 }} className="fixed-form">
                                <h1>{t('main.books.order')}</h1>
                                <MyFormComponent/>
                            </Col>
                        </Row>
                    </Container>
                </header>
            </div>
        );
    }
}
function BookItem(book) {

    return (
        <>
            <br/>
            <Card bg="dark" border="warning">
                <Card.Body>
                    <Card.Text className="title">{book.title}</Card.Text>
                    <Card.Text className="author">{book.author}</Card.Text>
                    <MyDetailsComponent>
                        <Card.Text>
                            {book.details}
                        </Card.Text>
                    </MyDetailsComponent>
                </Card.Body>
            </Card>
        </>
    );
}

const MyBooksComponent = withTranslation()(Books);
export default MyBooksComponent;
