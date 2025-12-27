
export enum UserRole {
  TALENT = 'TALENT',
  SPONSOR = 'SPONSOR'
}

export enum ListingType {
  BOUNTY = 'BOUNTY',
  PROJECT = 'PROJECT',
  GRANT = 'GRANT'
}

export enum ListingCategory {
  DEVELOPMENT = 'DEVELOPMENT',
  DESIGN = 'DESIGN',
  WRITING = 'WRITING',
  VIDEO = 'VIDEO',
  MARKETING = 'MARKETING',
  HACKATHON = 'HACKATHON'
}

export enum ListingStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Added OPTIMISM and BASE members to fix errors in ListingDetail.tsx
export enum BlockchainNetwork {
  ETHEREUM = 'Ethereum',
  OPTIMISM = 'Optimism',
  BASE = 'Base'
}

export interface User {
  id: string;
  address: string;
  role: UserRole;
  username: string;
  bio: string;
  reputationScore: number;
  completedTasks: number;
  avatarUrl?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  category: ListingCategory;
  status: ListingStatus;
  rewardAmount: number;
  rewardToken: string;
  network: BlockchainNetwork;
  sponsorId: string;
  sponsorName: string;
  deadline: string;
  tags: string[];
}

export interface Submission {
  id: string;
  listingId: string;
  talentId: string;
  content: string;
  submittedAt: string;
  isWinner: boolean;
}
