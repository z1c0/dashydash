class Countdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        index : 0
      }
      this.theme = misc.getRandomTheme();
    }
  
    componentDidMount() {
      const div = this.refs.abc;
      div.style.fontSize = 0.25 * div.clientWidth + 'px';
  
      const self = this;
      this.intervalId = setInterval(function() {
        self.setState({
          index : (self.state.index + 1) % letters.length
        });
      }, moment.duration(15, 'seconds'));
    }
  
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    
  
    render() {
      var l = letters[this.state.index];
      return (
        <div className='countdown' ref='countdown' className={this.theme}>
          <p>
            <span>{l[0]}</span>
            <i className={'e1a-' + l[1]}></i>
          </p>
        </div>
      );
    }
  };
  
  module.exports = Countdown