import React, { Component } from 'react';

class Questions extends Component {
  constructor(props) {
    super(props);
     this.state = {
     };
  }
  render() {
    let data = this.props.data;
    let totalOptions = [];
    let options = [];
    let QNumber = this.props.QNumber;
    totalOptions = (data.incorrect_answers).concat(data.correct_answer);
    options = totalOptions.map((n, index) => {
      return (
        <div className="radio" key={index}>
          <label><input type="radio" name={QNumber} value={n} onChange={this.props.handleChange}/>{n}</label>
        </div>
      );  
    });
    return (
      <div className="question">
        <div className="panel panel-default">
          <div className="panel-heading">{data.question}</div>
          {options}
        </div>
      </div>
    );
  }
}

export default Questions;
