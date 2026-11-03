export interface WeddingConfig {
  groom: {
    name: string;
    fullName: string;
    parents?: string;
    address?: string;
  };
  bride: {
    name: string;
    fullName: string;
    parents?: string;
    address?: string;
  };
  salam: string;
  inviteText: string;
  akad: {
    title: string;
    date: string;
    time: string;
  };
  resepsi: {
    title: string;
    date: string;
    time: string;
  };
  verse: {
    text: string;
    surah: string;
  };
  targetDate: string; // ISO string
  map: {
    title: string;
    placeName: string;
    address: string;
    googleMapsUrl: string;
    imageSrc: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    note: string;
  };
  closing: {
    text: string;
    signOff: string;
  };
  musicUrl: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  message: string;
  createdAt: string;
}
