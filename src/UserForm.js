import React, { Component } from 'react';
import { onSaveUser } from './store';
import { connect } from 'react-redux';

class UserForm extends Component {
    constructor(props) {
        super(props)
        if (!this.props.uuid) {
            this.state = {
                name: '',
                bio: '',
                rank: ''
            }
        }
        else {
            const user = this.props.user;
            this.state = {
                name: user ? user.name : '',
                bio: user ? user.bio : '',
                rank: user ? user.rank : ''
            }
        }
    }
    componentDidUpdate(prevProps) {
        console.log('the prevProps: ', prevProps)
        if (this.props.uuid && !prevProps.user && this.props.user) {
            const user = this.props.user;
            this.setState({
                name: user ? user.name : '',
                bio: user ? user.bio : '',
                rank: user ? user.rank : ''
            })
        }
    }
    render() {
        console.log('the state: ', this.state)
        console.log('the props: ', this.props)
        const editing = !!this.props.uuid
        const { history, save } = this.props;
        const userToUpdate = {...this.state}
        userToUpdate.uuid = this.props.uuid;
        const fields = [
            'name', 'bio', 'rank'
        ]

        const handleClick = () => {
            save(editing ? userToUpdate : this.state)
            history.push('/users')
        }
        
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
                <button className="btn btn-primary" type="submit" onClick={() => handleClick()}>{editing ? 'Edit' : 'Create'}</button>
                <button className="btn btn-info" onClick={() => history.push('/users')}>Cancel</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save: user => dispatch(onSaveUser(user))
    }
}

export default connect(null, mapDispatchToProps)(UserForm);

