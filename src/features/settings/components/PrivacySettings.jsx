import React from 'react';
import PrivacyControls from './PrivacyControls';
import DataStorage from './DataStorage';
import SupportFeedback from './SupportFeedback';

export default function PrivacySettings() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Privacy Controls Card */}
      <PrivacyControls />

      {/* 2. Data & Storage Card */}
      <DataStorage />

      {/* 3. Support & Feedback Card */}
      <SupportFeedback />
    </div>
  );
}
