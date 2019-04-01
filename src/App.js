import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
                <h1>Acme Users With Ranks <i>by Dan</i></h1>
                <Fragment>
                    <Route render={({ location }) => <Nav location={location} count={users.length} topRankedUsers={topRankedUsers} />} />
                    <Route path="/" exact render={() => <Home count={users.length} /> } />
                    <Route path="/users" exact render={() => <Users users={users} /> } />
                    <Switch>
                        <Route path="/users/topRanked" exact render={() => <Users users={topRankedUsers}  /> } />
                        <Route render={({ history }) => <UserForm history={history} /> } path="/users/create" exact />
                        <Route render={({ history, match }) => <UserForm history={history} user={users.find(user => user.uuid === match.params.uuid)} uuid={match.params.uuid} /> } path="/users/:uuid" exact />
                    </Switch>
                </Fragment>
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
