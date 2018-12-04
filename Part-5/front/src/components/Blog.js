import React from 'react'
import BlogDetail from './BlogDetail'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      showDetail: false,
      isByCurrentUser: props.isByCurrentUser
    }
    this.likeHandler = props.likeHandler
    this.deleteHandler = props.deleteHandler
  }
  toggleDetail = () => {
    this.setState({ showDetail: !this.state.showDetail })
  }
  render () {
    const detailView = { display: this.state.showDetail ? '' : 'none' }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle}>
        <div onClick={this.toggleDetail}>{this.state.blog.title} {this.state.blog.author}</div>
        <div style={detailView}>
          <BlogDetail blog={this.state.blog}
            likeHandler={this.likeHandler}
            deleteHandler={this.deleteHandler}
            deletable={this.state.isByCurrentUser} />
        </div>
      </div>
    )
  }
}
export default Blog