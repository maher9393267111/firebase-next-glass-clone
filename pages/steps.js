import React from "react";
import { useState, useEffect } from "react";
import { useSub } from "../context/sub";

import { query, orderBy, collection, doc } from "firebase/firestore";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/global";
import Step1 from "../components/steps/step1";
import Step2 from "../components/steps/step2";
import Step3 from "../components/steps/step3";
import { Button, message, Steps } from "antd";

const { Step } = Steps;
const steps = [
  {
    title: "First",
    content: <Step1 />,
  },
  {
    title: "second",
    content: <Step2 />,
  },
  {
    title: "end",
    content: <Step3 />,
  },
];
const Stepspage = () => {
  const [currentstep, setStep] = useState("step1");

  const {} = useSub();
  const { userinfo } = useAuth();

  const [userdata] = useDocumentData(doc(db, "users", `${userinfo?.email}`));

  useEffect(() => {
console.log("userdata **---------**", userdata);

  }, []);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
        {userdata?.cart?.length }
      <div className=" mt-16 w-[55%] mx-auto">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content   mt-12 min-h-[300px] ml-12 mr-12">
          {steps[current].content}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>

      <div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Stepspage;
