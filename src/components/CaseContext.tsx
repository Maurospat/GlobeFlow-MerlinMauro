
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialDocuments, Document, DocStatus } from '@/app/data/mockData';

type CaseContextType = {
  documents: Document[];
  updateDocumentStatus: (id: string, status: DocStatus) => void;
  progress: number;
};

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const updateDocumentStatus = (id: string, status: DocStatus) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status } : doc
    ));
  };

  const completedCount = documents.filter(d => d.status === 'approved' || d.status === 'under_review' || d.status === 'uploaded').length;
  const progress = Math.round((completedCount / documents.length) * 100);

  return (
    <CaseContext.Provider value={{ documents, updateDocumentStatus, progress }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCase must be used within a CaseProvider');
  return context;
}
