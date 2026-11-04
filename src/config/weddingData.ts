import type { WeddingConfig } from '../types';

export const weddingData: WeddingConfig = {
  groom: {
    name: 'Aji',
    fullName: 'Aji Nursafiki',
    parents: 'Putra dari Bapak Siswanto & Ibu Siti Dasronah',
    address: 'Kanggotan, Pleret, Pleret, Bantul',
  },
  bride: {
    name: 'Arina',
    fullName: 'Arina Nur Nadhifah, S.H.',
    parents: 'Putri dari Bapak Damanhuri & Ibu Nur Janah',
    address: 'Brajan, Wonokromo, Pleret, Bantul',
  },
  salam: 'Assalamuallaikum Wr.Wb',
  inviteText:
    'Kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara resepsi pernikahan:',
  verse: {
    text:
      'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
    surah: '(Ar-Rum : 21)',
  },
  akad: {
    title: 'Akad Nikah',
    date: 'MINGGU, 13 DESEMBER 2026',
    time: '08.00 WIB',
  },
  resepsi: {
    title: 'Resepsi',
    date: 'MINGGU, 13 DESEMBER 2026',
    time: '10.00 - 11.00 WIB',
  },
  targetDate: '2026-12-13T08:00:00+07:00',
  map: {
    title: 'Maps',
    placeName: 'Aula HDWR',
    address: 'Brajan, Wonokromo, Pleret, Bantul, D.I. Yogyakarta',
    googleMapsUrl:
      'https://maps.app.goo.gl/fUTXJaQKEn1YAkuX9',
    imageSrc: '/assets/map.png',
  },
  bank: {
    bankName: 'BBRI',
    accountNumber: '697501008962508',
    accountHolder: 'ARINA NUR NADHIFAH',
    note:
      'Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah Anda.',
  },
  closing: {
    text:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu. Atas kehadiran dan do'a restunya kami ucapkan terima kasih.",
    signOff: 'Kami yang berbahagia',
  },
  musicUrl: '/music/wedding-song.mp3?v=1',
};
