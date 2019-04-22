import React, {Component } from 'react';
import Questions from './Questions';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      answers: [],
      correctAnswersCount: 0,
      showMessage: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({questions: result});
      },
      (error) => {
        this.setState({
          items: ''
        });
      }
    )
  }
  handleSubmit = event => {
    event.preventDefault();
    let i;
    let answers = this.state.answers;
    let questions = this.state.questions.results;
    let answersLength = answers.length;
    let lhs;
    let rhs;
    let correctAnswersCount = 0;
    for (i = 0; i < answersLength; i++) {
      lhs = questions[Object.keys(answers[i])].correct_answer;
      rhs = Object.values(answers[i]);
      if (lhs == rhs) {
        correctAnswersCount++;
      }
    }
    this.setState({correctAnswersCount: correctAnswersCount, showMessage: true});
    //showing total correct answer count at top after submit
    window.scrollTo(-10, -10)
  }
  handleChange = event => {
    let { name, value } = event.target;
    let joined = this.state.answers.concat({[name]:value});
    this.setState({answers:joined});
  };
  render() {
    let results = this.state.questions.results;
    let correctAnswersCount = this.state.correctAnswersCount;
    let showMessage = this.state.showMessage;
    let questions = [];
    if (results && results.length > 0) {
      try {
        questions = results.map((n, index) => {
          return (
            <Questions key={index} data = {n} QNumber={index} handleChange={this.handleChange}/>
          );
        });
      } catch (err) { console.log(err); }
    }
    return(
      <div className="container-fluid">
        <div className="users-form">
          <div className="form-group row">
            <div className="col-xs-12">
              <div className="page-header">
                <h1>Trivia Game</h1>      
              </div>
              {correctAnswersCount > 0 && showMessage &&
                <div className="alert alert-success count">
                  <p><strong>Total Correct Answers:</strong> {correctAnswersCount}</p>
                </div>
              }
              {correctAnswersCount === 0 && showMessage &&
                <div className="alert alert-danger count">
                  <p><strong>All are incorrect</strong></p>
                </div>
              }
              {questions.length > 0 && questions}
              {questions.length === 0 &&
                <div className="text-center">
                  No Questions Found
                </div>
              }
              <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
            </div> 
          </div> 
        </div>
      </div>
    );
  }
}

export default Main;