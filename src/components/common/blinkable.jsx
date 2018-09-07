'use strict';
const React = require('react');

class Blinkable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.blink = false
    this.blinkDone = this.blinkDone.bind(this)
  }
  componentDidMount () {
    const elm = this.refs.clickable
    elm.addEventListener('animationend', this.blinkDone)
  }
  componentWillUnmount () {
    const elm = this.refs.clickable
    elm.removeEventListener('animationend', this.blinkDone)
  }
  blinkDone () {
    // will re-render component, removing the animation class
    this.setState({ blink : false })
  }

  render () {
    const blink = this.state.blink
    return (
      <div
        ref='clickable'
        onClick={() => this.setState({ blink : true}) }
        className={ blink ? 'blink' : ''}>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Blinkable;