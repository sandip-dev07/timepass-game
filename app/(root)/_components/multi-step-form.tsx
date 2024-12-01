"use client";
import React, { useState } from "react";
import { Sidebar } from "./side-bar";
import { PersonalInfo } from "./personal-info";
import { SelectPlan } from "./select-plan";
import { AddOns } from "./add-ons";
import { Summary } from "./summary";
import { Invoice } from "./invoice";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderComponent = () => {
    const stepProps = {
      goToNextStep: nextStep,
      goToPreviousStep: prevStep,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfo {...stepProps} />;
      case 2:
        return <SelectPlan {...stepProps} />;
      case 3:
        return <AddOns {...stepProps} />;
      case 4:
        return <Summary {...stepProps} setCurrentStep={setCurrentStep} />;
      case 5:
        return <Invoice />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-4 grid md:grid-cols-[300px_1fr] gap-4 max-w-4xl w-full shadow-lg">
        <Sidebar currentStep={currentStep} />
        <main className="p-4 md:p-8 min-h-[560px] max-h-[560px]">{renderComponent()}</main>
      </div>
    </div>
  );
};

export default MultiStepForm;
