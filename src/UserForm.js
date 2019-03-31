import React, { Component } from 'react';
import { createUser } from './store';
import { connect } from 'react-redux';

class UserForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            bio: '',
            rank: ''
        }
    }
    render() {
        const { history, create } = this.props;
        const fields = [
            'name', 'bio', 'rank'
        ]
        return (
            <div>
                <form className="form-group">
                    {
                        fields.map(field => (
                            <input
                                key={field}
                                className="form-control"
                                type="text"
                                value={this.state[field]}
                                onChange={(ev) => this.setState({ [field]: ev.target.value })}
                                placeholder={field}
                            />
                        ))
                    }
                </form>
                <button className="btn btn-primary" type="submit" onClick={() => create(this.state)}>Create</button>
                <button className="btn btn-info" onClick={() => history.push('/users')}>Cancel</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: user => dispatch(createUser(user))
    }
}

export default connect(null, mapDispatchToProps)(UserForm);

