//http://jsfiddle.net/a3eeLomu/24/
import React from 'react'


var AdaptivePlaceholder = React.createClass({
  createStateFromProps: function(props){
    return {
      label: (props.value ?
        props.label || props.placeholder :
        props.placeholder || props.label),
      style: (props.value ? 'label' : 'placeholder')
    };
  },
  getInitialState: function(){
    return this.createStateFromProps(this.props);
  },
  componentWillReceiveProps: function(props){
    this.setState(this.createStateFromProps(props));
  },
  render: function(){
    return (
      <label
        className={this.state.style}
        onClick={this.props.onClick}>{this.state.label}</label>
    );
  }
});

var LabeledField = React.createClass({
    getInitialState: function(){
        return {
            value: this.props.value
        };
    },
    handleChange: function(ev) {
        this.setState({
            value: ev.target.value
        });
    },
    handleLabelClick: function(ev){
      this.refs.in.getDOMNode().focus();
    },
    render: function() {
        var field = React.addons.cloneWithProps(
            React.Children.only(this.props.children), {
                ref: 'in', 
                onChange: this.handleChange
            });
        return (
            <div className='labeled-field'>
                {field}
                <AdaptivePlaceholder 
                    {... this.props}
                    value={this.state.value}
                    onClick={this.handleLabelClick}/>
            </div>
        );
    }
});
 
React.render(
    <form>
        <LabeledField placeholder="Enter a title" label="Title">
          <input type="text" />
        </LabeledField>
        <LabeledField placeholder="Enter your name" label="Your name is">
          <input type="text" />
        </LabeledField>
        <LabeledField placeholder="Tell us a story" label="Your story">
          <textarea />
        </LabeledField>
    </form>, document.body);
