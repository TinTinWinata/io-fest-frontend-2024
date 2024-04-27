import { IHistoryCardContainerProps } from '../pages/history-page/history-card-container';

export const HISTORIES_DATA: IHistoryCardContainerProps[] = [
  {
    title: 'Sebelum Masehi',
    histories: [
      {
        date: '2000 SM - 500 SM',
        description:
          'Jejak kehidupan awal manusia purba di Indonesia seperti Homo erectus dan Homo sapiens.',
        image: '/assets/histories/1.png',
        title: 'Manusia Purba',
      },
      {
        date: '500 SM - 100 M',
        description:
          'Kedatangan dan pengaruh Hindu-Buddha dari India, kerajaan-kerajaan awal seperti Tarumanegara dan Kutai.',
        image: '/assets/histories/2.png',
        title: 'Hindu-Buddha',
      },
    ],
  },
  {
    title: 'Sesudah Masehi',
    histories: [
      {
        date: '1300 M - 1600 M',
        description:
          'Islam masuk dan menyebar luas di Indonesia, berdirinya kerajaan-kerajaan Islam seperti Aceh, Demak, Banten.',
        image: '/assets/histories/3.png',
        title: 'Islam',
      },
      {
        date: '1600 M - 1800 M',
        description:
          'Kedatangan bangsa Eropa untuk perdagangan rempah-rempah, persaingan dan perebutan kekuasaan.',
        image: '/assets/histories/4.png',
        title: 'Bangsa Eropa',
      },
      {
        date: '1800 M - 1945 M',
        description:
          'Penjajahan Belanda, perlawanan rakyat Indonesia terus berlanjut, seperti Perang Diponegoro, Perang Padri.',
        image: '/assets/histories/5.png',
        title: 'Penjajahan Belanda',
      },
    ],
  },
  {
    title: 'Indonesia Merdeka',
    histories: [
      {
        date: '1945',
        description:
          'Proklamasi kemerdekaan Indonesia pada 17 Agustus 1945 dilakukan oleh Soekarno dan Mohammad Hatta.',
        image: '/assets/histories/6.png',
        title: 'Proklamasi',
      },
      {
        date: '1965 - 1998',
        description:
          'Orde Baru dibawah Soeharto, pembangunan ekonomi pesat, stabilitas politik, namun dengan kontrol ketat.',
        image: '/assets/histories/7.png',
        title: 'Orde Baru',
      },
      {
        date: '1998 - Sekarang',
        description:
          'Perubahan menuju tatanan politik yang lebih demokratis, kebebasan pers dan demokrasi, pemilihan umum langsung',
        image: '/assets/histories/8.png',
        title: 'Reformasi',
      },
    ],
  },
];
