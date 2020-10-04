import React, { Component } from 'react';
import './Stepper.scss';

class Stepper extends Component {
    constructor(){
        super();
        this.state = {
            steps : []
        };
    }
    // "Create an account","Add personal data","Add payment","Submit Application"
    // Completed - to show a checkmark(tick)
    // Selected - to fill the step with color
    // Highlighted - to make the description bold;

    componentDidMount()
    {
        const {steps, currentStepNumber} = this.props;
        const stepState = steps.map((step,index) => {
            const stepObj = {};
            stepObj.description = step;
            stepObj.completed = false;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            return stepObj;
        });
        const currentSteps = this.updateStep(currentStepNumber-1, stepState);
        this.setState({steps : currentSteps});
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentStepNumber !== this.props.currentStepNumber){
            const {steps} = this.state;
            const currentSteps = this.updateStep(this.props.currentStepNumber-1, steps);
            this.setState({steps : currentSteps});
        }
    }

    updateStep(stepNumber, steps){
        // 1. Current Step 2. Past Step 3. Future Step
        const newSteps = [...steps];
        let stepCounter = 0;
        while(stepCounter < newSteps.length){
            if(stepCounter === stepNumber){
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted : true,
                    selected : true,
                    completed : false,
                };
                stepCounter++;
            } 
            else if(stepCounter< stepNumber){
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted : false,
                    selected : true,
                    completed : true
                }
                stepCounter++;
            }
            
            //Future Step
            else{
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted : false,
                    selected : false,
                    completed : false
                }
                stepCounter++;
            }
        }

        return newSteps;
    }
     
    render() {
        const  {steps} = this.state;
        const stepsDisplay = steps.map((step,index) => {
            return (
                <div className="step-wrapper" key={index}>
                    <div className={`step-number ${step.selected ? "step-number-active" : "step-number-disabled"}`}>{step.completed ? <span>&#10003;</span> :index+1}</div>
                    <div className={`step-description ${step.highlighted && "step-description-active"} `}>{step.description}</div>
                    <div className={index !== steps.length -1 ? `divider-line divider-line-${steps.length}` : ""} />
                </div>
            )
        })
        return (
            <div className="stepper-wrapper-horizontal">
                {stepsDisplay}
            </div>
        );
    }
}

export default Stepper;