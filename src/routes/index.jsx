import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { JourneyPage } from '../pages/JourneyPage';
import { MutationAssistPage } from '../pages/MutationAssistPage';
import { OwnershipTransferPage } from '../pages/OwnershipTransferPage';
import { DeedVerifyPage } from '../pages/DeedVerifyPage';
import { MutationTrackerPage } from '../pages/MutationTrackerPage';
import { ConsistencyCheckerPage } from '../pages/ConsistencyCheckerPage';
import { RiskPassportPage } from '../pages/RiskPassportPage';
import { HelpCenterPage } from '../pages/HelpCenterPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/mutation-assist" element={<MutationAssistPage />} />
      <Route path="/ownership-transfer" element={<OwnershipTransferPage />} />
      <Route path="/deed-verify" element={<DeedVerifyPage />} />
      <Route path="/mutation-tracker" element={<MutationTrackerPage />} />
      <Route path="/consistency-checker" element={<ConsistencyCheckerPage />} />
      <Route path="/risk-passport" element={<RiskPassportPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
