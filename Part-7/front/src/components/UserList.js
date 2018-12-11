import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
    render() {
        const blogCount = (user) => user.blogs ? user.blogs.length : 0
        const UserRow = ({ user }) => {
            const url = `/users/${user.id}`
            return (
            <tr>
                <td><Link to={url}>{user.username}</Link></td>
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

const mapStateToProps = (state) => {
    return {
        users: state.user.users
    }
}
export default connect(mapStateToProps)(UserList)