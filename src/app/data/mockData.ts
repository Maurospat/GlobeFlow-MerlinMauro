
export type DocStatus = "not_uploaded" | "uploaded" | "under_review" | "approved" | "rejected";
export type TransferStatus = "not_started" | "initiated" | "in_review" | "in_transit" | "completed";

export interface Document {
  id: string;
  title: string;
  whyNeeded: string;
  howToGet: string;
  status: DocStatus;
  comment?: string;
}

export interface Transfer {
  id: string;
  homeBank: string;
  contactName: string;
  amount: number;
  currency: string;
  status: TransferStatus;
  etaDays: number;
  fxRate: number;
}

export const initialDocuments: Document[] = [
  {
    id: '1',
    title: 'Passport Copy',
    whyNeeded: 'Required for identity verification and visa issuance.',
    howToGet: 'Scan the biographical page of your valid passport.',
    status: 'not_uploaded'
  },
  {
    id: '2',
    title: 'Proof of Address',
    whyNeeded: 'To verify your current place of residence in your home country.',
    howToGet: 'A utility bill or bank statement from the last 3 months.',
    status: 'not_uploaded'
  },
  {
    id: '3',
    title: 'Tax Residency Certificate',
    whyNeeded: 'Determines your tax obligations and eligibility for specific treaties.',
    howToGet: 'Apply via your local tax authority portal.',
    status: 'not_uploaded'
  },
  {
    id: '4',
    title: 'Bank Statements (6 months)',
    whyNeeded: 'Proof of financial standing and funds availability.',
    howToGet: 'Download as PDF from your online banking portal.',
    status: 'not_uploaded'
  },
  {
    id: '5',
    title: 'Source of Funds Declaration',
    whyNeeded: 'Anti-money laundering requirement.',
    howToGet: 'Use the GlobeFlow template provided in the vault.',
    status: 'not_uploaded'
  },
  {
    id: '6',
    title: 'Indonesian Visa Paperwork',
    whyNeeded: 'The formal application for your long-term residency.',
    howToGet: 'Will be generated automatically after other documents are approved.',
    status: 'not_uploaded'
  }
];

export const initialTransfer: Transfer = {
  id: 't1',
  homeBank: 'Royal Bank of London',
  contactName: 'James Wilson',
  amount: 250000,
  currency: 'USD',
  status: 'not_started',
  etaDays: 4,
  fxRate: 15650.45
};
