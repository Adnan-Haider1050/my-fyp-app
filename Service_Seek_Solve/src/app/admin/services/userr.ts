export interface Userr {
  _id: string;
  name: string;
  profession: string;
  phoneNumber: string;
  location: string;
  profileImage?: string;
  role: 'provider' | 'seeker' | string;
}
