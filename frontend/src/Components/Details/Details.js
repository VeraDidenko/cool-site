import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import { withTranslation } from 'react-i18next';


class Details extends Component {

    state = {
        on: false,
    }

    details = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        const { t } = this.props;

        return (
            <div>{this.state.on && this.props.children}
                <Button variant="outline-warning" onClick={this.details}>{t('main.books.details')}</Button>
            </div>
        )
    }
}
const MyDetailsComponent = withTranslation()(Details);
export default MyDetailsComponent;