
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initialDocuments, Document, DocStatus, TransferStatus, initialTransfer } from '@/app/data/mockData';

type BankDetails = {
  bankName: string;
  swift: string;
  iban: string;
  customerNo: string;
};

type CaseContextType = {
  documents: Document[];
  updateDocumentStatus: (id: string, status: DocStatus) => void;
  transferStatus: TransferStatus;
  updateTransferStatus: (status: TransferStatus) => void;
  isPoASigned: boolean;
  setPoASigned: (val: boolean) => void;
  bankDetails: BankDetails;
  updateBankDetails: (details: Partial<BankDetails>) => void;
  progress: number;
};

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [transferStatus, setTransferStatus] = useState<TransferStatus>(initialTransfer.status);
  const [isPoASigned, setIsPoASigned] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: initialTransfer.homeBank,
    swift: '',
    iban: '',
    customerNo: ''
  });

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('globeflow-case-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.documents) setDocuments(parsed.documents);
        if (parsed.transferStatus) setTransferStatus(parsed.transferStatus);
        if (parsed.isPoASigned) setIsPoASigned(parsed.isPoASigned);
        if (parsed.bankDetails) setBankDetails(parsed.bankDetails);
      } catch (e) {
        console.error("Failed to parse saved case data", e);
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('globeflow-case-data', JSON.stringify({
      documents,
      transferStatus,
      isPoASigned,
      bankDetails
    }));
  }, [documents, transferStatus, isPoASigned, bankDetails]);

  const updateDocumentStatus = (id: string, status: DocStatus) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status } : doc
    ));
  };

  const updateTransferStatus = (status: TransferStatus) => {
    setTransferStatus(status);
  };

  const updateBankDetails = (details: Partial<BankDetails>) => {
    setBankDetails(prev => ({ ...prev, ...details }));
  };

  // Fortschrittsberechnung:
  // Dokumente (Hochgeladen oder weiter) zählen für 70% (ca. 11.6% pro Dokument)
  const uploadedDocs = documents.filter(d => d.status !== 'not_uploaded').length;
  const docProgress = (uploadedDocs / documents.length) * 70;

  // Transfer zählt für 30%
  let transferProgressVal = 0;
  if (transferStatus === 'initiated') transferProgressVal = 5;
  if (transferStatus === 'in_review') transferProgressVal = 10;
  if (transferStatus === 'in_transit') transferProgressVal = 20;
  if (transferStatus === 'completed') transferProgressVal = 30;

  const progress = Math.round(docProgress + transferProgressVal);

  return (
    <CaseContext.Provider value={{ 
      documents, 
      updateDocumentStatus, 
      transferStatus, 
      updateTransferStatus,
      isPoASigned,
      setPoASigned: setIsPoASigned,
      bankDetails,
      updateBankDetails,
      progress 
    }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCase must be used within a CaseProvider');
  return context;
}
