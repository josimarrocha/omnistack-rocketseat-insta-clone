import React, { Component } from 'react'
import api from '../services/api'
import io from 'socket.io-client'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import likeCor from '../assets/like.1.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
import './Feed.css'


class Feed extends Component {
  _unmount = false

  state = {
    feed: [],
  }
  componentWillUnmount() {
  }

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('posts')
    this.setState({ feed: response.data })

  }

  registerToSocket = () => {
    const socket = io('http://localhost:3001')
    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] })
    })
    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => {
          return post._id === likedPost._id ? likedPost : post
        })
      })
    })
  }

  handleLike = id => {
    api.post(`posts/${id}/like`)
  }

  render() {
    const { feed } = this.state
    return (
      <section id='post-list'>
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className='user-info'>
                <span>{post.author}</span>
                <span className='place'>{post.place}</span>
              </div>
              <img src={more} alt='' />
            </header>
            <img src={`http://localhost:3001/files/${post.image}`} alt="" />

            <footer>
              <div className="actions">
                <button type='button' onClick={() => this.handleLike(post._id)}>
                  <img src={post.likes ? likeCor : like} alt="" />
                </button>
                <img src={comment} alt="" />
                <img src={send} alt="" />
              </div>
              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    )
  }
}

export default Feed