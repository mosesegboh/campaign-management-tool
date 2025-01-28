export interface CampaignPayout {
    id?: number;
    campaign_id?: number;
    country: 'Estonia' | 'Spain' | 'Bulgaria';
    payout_value: number;
}

export interface Campaign {
    id: number;
    advertiser_id: number;
    title: string;
    landing_page_url: string;
    activity_status: 'active' | 'paused';
    payouts: CampaignPayout[];
}

export interface CreateCampaignPayload {
    advertiser_id: number;
    title: string;
    landing_page_url: string;
    payouts: {
        country: 'Estonia' | 'Spain' | 'Bulgaria';
        payout_value: number;
    }[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    advertiser: {
        id: number;
    };
}

export interface Advertiser {
    id: number;
    user_id: number;
    name: string;
    email: string;
    advertiser_id: number;
}

export interface AuthContextProps {
    user: User | null;
    advertiser: Advertiser | null;
    token: string | null;
    register: (data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
}

export interface CampaignFormValues {
    advertiser_id: string;
    title: string;
    landing_page_url: string;
    payouts: { country: string; payout_value: number }[];
}


export interface PayoutInput {
    country: 'Estonia' | 'Spain' | 'Bulgaria';
    payout_value: number;
}

