import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from './store';

import Nav from './Nav'
import Users from './Users'
import Home from './Home'
import UserForm from './UserForm'

class App extends Component {
    componentDidMount() {
        this.props.fetchUsers()
    }
    render() {
        const { users } = this.props;
        const topRankedUsers = users.sort( (a, b) => a.rank - b.rank).reduce( (acc, user) => {
            let currTopRank = users[0];
            if (user.rank <= currTopRank.rank) {
                currTopRank = user;
                acc.push(user)
            }
            return acc;
        }, [])
        return (
            <Router>
                <h1>Acme Users With Ranks</h1>
                <Route render={({ location }) => <Nav location={location} count={users.length} topRankedUsers={topRankedUsers} />} />
                <Route exact path="/"  render={() => <Home count={users.length} /> } />
                <Route exact path="/users" render={() => <Users users={users} /> } />
                <Route exact path="/users/create" render={({ history }) => <UserForm history={history} /> } />
                <Route exact path="/users/topRanked" render={() => <Users users={topRankedUsers}  /> } />
            </Router>
        )
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

const mapStateToProps = (state) => {
    return {
        users: state
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
