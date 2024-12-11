export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface ChannelFormData {
  name: string;
  description: string;
  slug: string;
  avatarURL: string;
  headerURL: string;
}
export interface ChannelSecureURLData {
  avatarName: string;
  avatarType: string;
  headerName: string;
  headerType: string;
}
