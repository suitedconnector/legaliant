'use client';

import { useState } from 'react';
import { DollarSign, Calendar, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';

function Label({ children, hint }) {
  return (
    <label className="block text-sm font-semibold text-navy mb-1.5">
      {children}
      {hint && <span className="font-normal text-gray-400 ml-1.5 text-xs">{hint}</span>}
    </label>
  );
}

function FieldRow({ icon: Icon, children }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
          <Icon size={16} />
        </div>
      )}
      <div className={Icon ? 'pl-9' : ''}>{children}</div>
    </div>
  );
}

export default function StepOne({ animClass, formData, onUpdate, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.annualSalary) e.annualSalary = 'Required';
    if (!formData.yearsEmployed) e.yearsEmployed = 'Required';
    if (!formData.terminationDate) e.terminationDate = 'Required';
    if (!formData.currentlyEmployed) e.currentlyEmployed = 'Please select one';
    if (formData.currentlyEmployed === 'yes' && !formData.newSalary) {
      e.newSalary = 'Please enter your new salary';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  const formatSalary = (val) => {
    const n = val.replace(/[^0-9]/g, '');
    return n ? Number(n).toLocaleString() : '';
  };

  return (
    <div className={`${animClass} pt-8`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-2">
          <Briefcase size={13} />
          Step 1 of 4
        </div>
        <h2 className="font-serif text-navy text-2xl font-bold">Your Employment Situation</h2>
        <p className="text-gray-500 text-sm mt-1">
          Tell us about your position and termination to calculate your baseline damages.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 space-y-5">
        <div>
          <Label hint="at time of termination">Annual Salary</Label>
          <FieldRow icon={DollarSign}>
            <input
              className="input-gold pl-9"
              type="text"
              inputMode="numeric"
              placeholder="85,000"
              value={formData.annualSalary}
              onChange={e => onUpdate({ annualSalary: formatSalary(e.target.value) })}
            />
          </FieldRow>
          {errors.annualSalary && <p className="text-red-500 text-xs mt-1">{errors.annualSalary}</p>}
        </div>

        <div>
          <Label hint="total at this employer">Years Employed</Label>
          <FieldRow icon={Briefcase}>
            <input
              className="input-gold pl-9"
              type="number"
              min="0"
              step="0.5"
              placeholder="3.5"
              value={formData.yearsEmployed}
              onChange={e => onUpdate({ yearsEmployed: e.target.value })}
            />
          </FieldRow>
          {errors.yearsEmployed && <p className="text-red-500 text-xs mt-1">{errors.yearsEmployed}</p>}
        </div>

        <div>
          <Label>Date of Termination</Label>
          <FieldRow icon={Calendar}>
            <input
              className="input-gold pl-9"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={formData.terminationDate}
              onChange={e => {
                const days = Math.floor((Date.now() - new Date(e.target.value)) / 86400000);
                onUpdate({ terminationDate: e.target.value, daysSinceTermination: String(Math.max(0, days)) });
              }}
            />
          </FieldRow>
          {errors.terminationDate && <p className="text-red-500 text-xs mt-1">{errors.terminationDate}</p>}
        </div>

        <div>
          <Label>Are you currently employed?</Label>
          <div className="flex gap-3">
            {[
              { val: 'yes', label: 'Yes, found new work' },
              { val: 'no',  label: 'No, still searching' },
            ].map(({ val, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => onUpdate({ currentlyEmployed: val })}
                className={`toggle-btn ${formData.currentlyEmployed === val ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.currentlyEmployed && <p className="text-red-500 text-xs mt-1">{errors.currentlyEmployed}</p>}
        </div>

        {formData.currentlyEmployed === 'yes' && (
          <div className="step-enter-up">
            <Label hint="at new job (annual)">New Salary</Label>
            <FieldRow icon={TrendingUp}>
              <input
                className="input-gold pl-9"
                type="text"
                inputMode="numeric"
                placeholder="65,000"
                value={formData.newSalary}
                onChange={e => onUpdate({ newSalary: formatSalary(e.target.value) })}
              />
            </FieldRow>
            {errors.newSalary && <p className="text-red-500 text-xs mt-1">{errors.newSalary}</p>}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleNext} className="btn-gold text-base">
          Next: Your Claims
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
