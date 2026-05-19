'use client';

import { useState, useCallback } from 'react';
import Hero from './Hero';
import ProgressBar from './ProgressBar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import TeaserResults from './TeaserResults';
import Results from './Results';
import CopyrightProtection from './CopyrightProtection';

const INITIAL_FORM = {
  annualSalary: '',
  yearsEmployed: '',
  terminationDate: '',
  currentlyEmployed: '',
  newSalary: '',
  claimTypes: [],
  discriminationSubTypes: [],
  documentedEvidence: '',
  hrComplaintsFiled: '',
  witnesses: '',
  signedSeverance: '',
  daysSinceTermination: '',
};

export default function CalculatorTool() {
  const [step, setStep] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [animClass, setAnimClass] = useState('step-enter-right');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useCallback((newStep, direction = 'forward') => {
    setAnimClass(direction === 'forward' ? 'step-enter-right' : 'step-enter-left');
    setAnimKey(k => k + 1);
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateForm = useCallback((data) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleSubmitLead = useCallback(async (leadData) => {
    setIsLoading(true);
    setError(null);
    navigate(5, 'forward');

    const fullData = { ...formData, ...leadData };

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  const handleRecalculate = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setFormData(INITIAL_FORM);
    setStep(1);
    setAnimClass('step-enter-right');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showHero     = step < 5;
  const showProgress = step >= 1 && step <= 4;

  return (
    <div className="min-h-screen bg-gray-50">
      <CopyrightProtection />

      {showHero && <Hero compact={step > 1} />}
      {showProgress && <ProgressBar step={step} />}

      <main className={step < 5 ? 'max-w-2xl mx-auto px-4 pb-16' : ''}>
        {step === 1 && (
          <StepOne
            key={`step1-${animKey}`}
            animClass={animClass}
            formData={formData}
            onUpdate={updateForm}
            onNext={() => navigate(2)}
          />
        )}
        {step === 2 && (
          <StepTwo
            key={`step2-${animKey}`}
            animClass={animClass}
            formData={formData}
            onUpdate={updateForm}
            onNext={() => navigate(3)}
            onBack={() => navigate(1, 'back')}
          />
        )}
        {step === 3 && (
          <StepThree
            key={`step3-${animKey}`}
            animClass={animClass}
            formData={formData}
            onUpdate={updateForm}
            onNext={() => navigate(4)}
            onBack={() => navigate(2, 'back')}
          />
        )}
        {step === 4 && (
          <TeaserResults
            key={`teaser-${animKey}`}
            animClass={animClass}
            formData={formData}
            onSubmit={handleSubmitLead}
          />
        )}
        {step === 5 && (
          <Results
            key="results"
            analysis={analysis}
            formData={formData}
            isLoading={isLoading}
            error={error}
            onRetry={() => navigate(4, 'back')}
            onRecalculate={handleRecalculate}
          />
        )}
      </main>
    </div>
  );
}
