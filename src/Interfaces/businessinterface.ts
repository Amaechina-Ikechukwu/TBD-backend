export interface BusinessInterface {
  business_name: string;
  business_description: string | null;
  business_bank_name: string;
  business_bank_account_number: string;
  business_bank_account_name: string;
  business_facebook_link: string | null;
  business_instagram_link: string | null;
  business_twitter_link: string | null;
  business_phone_number: string;
  business_logo: string;
}
export interface ProviderData {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string | null;
  providerId: string;
}

export interface UserInterface {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  isAnonymous: boolean;
  tenantId: string | null;
  providerData: ProviderData[];
}
export interface CreateBusinessInterface {
  business_name: string;
  business_description: string | null;
  business_bank_name: string;
  business_bank_account_number: string;
  business_bank_account_name: string;
  business_facebook_link: string | null;
  business_instagram_link: string | null;
  business_twitter_link: string | null;
  business_phone_number: string;
  business_logo: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  isAnonymous: boolean;
  tenantId: string | null;
  providerData: ProviderData[];
}
