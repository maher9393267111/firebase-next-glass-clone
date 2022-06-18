import React from 'react';
import { useState,useEffect } from 'react';
import Step1 from '../components/steps/step1';
import Step2 from '../components/steps/step2';
import Step3 from '../components/steps/step3';
import { Button, message, Steps } from 'antd';
const { Step } = Steps;
const steps = [
    {
      title: 'First',
      content: <Step1/>,
    },
    {
      title: 'second',
      content: <Step2/>,
    },
    {
      title: 'end',
      content: <Step3/>,
    },
  ];
const Stepspage = () => {

const [currentstep, setStep] = useState('step1');


const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };



    return (
        <div>


<div className=' mt-16 w-[70%] mx-auto'>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content   mt-12 min-h-[500px] ml-12 mr-12">
      {steps[current].content}



      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>






 <div>

<div className=''>





</div>






 </div>




            
        </div>
    );
}

export default Stepspage;
