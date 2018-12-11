import React from 'react'
import { connect } from 'react-redux'
import { initialize } from './../reducers/userReducer'

class UserList extends React.Component {
    componentDidMount() {
        this.props.initialize()
    }
    render() {
        const blogCount = (user) => user.blogs ? user.blogs.length : 0
        const UserRow = ({ user }) => { return (
            <tr>
                <td>{user.username}</td>
                <td>{blogCount(user)}</td>
            </tr>
            )
        }
        return (
            <div>
                <h2>users</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>blogs added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user =>
                            <UserRow key={user.id} user={user} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapDispatchersToProps = {
    initialize
}
const mapStateToProps = (state) => {
    return {
        users: state.user.users
    }
}
export default connect(mapStateToProps, mapDispatchersToProps)(UserList)