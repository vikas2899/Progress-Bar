import React, { Component } from 'react';
import './App.scss';

import Stepper from './Stepper/Stepper';

class App extends Component {
constructor(){
  super();
  this.state = {
    currentStep : 1
  }
}

handleClick = (clickType) => { 
  const {currentStep} = this.state;
  let newStep = currentStep;
  clickType === "next" ? newStep++ : newStep--

  this.setState({currentStep : newStep});
}

  render() {
    const stepsArray = ["Basic",
                        "Ticket",
                        "Calender",
                        "Coupon",
                        "Staff Member","Cancel booking"];

    const {currentStep} = this.state;

    return (
      <>
        <div className="stepper-container-horizontal">
          <Stepper steps={stepsArray} currentStepNumber={currentStep}/>
        </div>
        <div className="button-container">
          <button onClick={() => this.handleClick()}>Previous</button>
          <button onClick={() => this.handleClick("next")}>Next</button>
        </div>
      </>
    );
  }
}

export default App;

