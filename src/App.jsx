import { useState, useCallback } from 'react';
import Hero from './components/Hero.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import StepOne from './components/StepOne.jsx';
import StepTwo from './components/StepTwo.jsx';
import StepThree from './components/StepThree.jsx';
import TeaserResults from './components/TeaserResults.jsx';
import Results from './components/Results.jsx';
import Disclaimer from './components/Disclaimer.jsx';
import CopyrightProtection from './components/CopyrightProtection.jsx';

const INITIAL_FORM = {
  // Step 1
  annualSalary: '',
  yearsEmployed: '',
  terminationDate: '',
  currentlyEmployed: '',
  newSalary: '',
  // Step 2
  claimTypes: [],
  discriminationSubTypes: [],
  // Step 3
  documentedEvidence: '',
  hrComplaintsFiled: '',
  witnesses: '',
  signedSeverance: '',
  daysSinceTermination: '',
};

// Steps: 1=Basic, 2=Claims, 3=Evidence, 4=Teaser+LeadCapture (unlock gate), 5=Results
export default function App() {
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

  // Called by TeaserResults after the padlock animation completes.
  // leadData contains the lead capture fields (name, email, phone, etc.)
  const handleSubmitLead = useCallback(async (leadData) => {
    setIsLoading(true);
    setError(null);
    navigate(5, 'forward'); // Navigate to Results (shows loading screen)

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
          />
        )}
      </main>

      {showHero && <Disclaimer />}
    </div>
  );
}
