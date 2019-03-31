import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { destroyUser } from './store';
import { connect } from 'react-redux';

class Users extends Component {
    render() {
        const { users, destroy } = this.props;
        return (
            <ul className="list-group">
                {
                    users.length ? users.map(user => (
                        <li key={user.id} className="list-group-item">
                            <div>
                                {user.name}
                            </div>
                            <div>
                                {user.bio}
                            </div>
                            <div className="badge badge-success">
                                Ranked {user.rank}
                            </div>
                            <div>
                                <button className="mt-2 btn btn-warning" type="submit" onClick={() => destroy(user.id)}>Delete</button>
                                <Link to={`/users/${user.id}`} className="float float-right">Edit</Link>
                            </div>
                        </li>
                    )) : ''
                }
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        destroy: (id) => dispatch(destroyUser(id))
    }
}

export default connect(null, mapDispatchToProps)(Users);
