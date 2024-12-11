import React from 'react';
import { StepType, type Step } from '../types';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="p-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`p-3 mb-2 rounded-md cursor-pointer ${
            currentStep === index + 1
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onStepClick(index + 1)}
        >
          <div className="flex items-center justify-between">
            <span>Step {index + 1}</span>
            <span className={`text-sm ${
              step.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {step.status}
            </span>
          </div>
          <div className="text-sm mt-1 opacity-80">
            {step.type === StepType.CreateFile ? `Create ${step.path}` : 'Run command'}
          </div>
        </div>
      ))}
    </div>
  );
}