export const theme = {
  colors: {
    primary: {
      DEFAULT: '#006A4E', // Bangladesh Green
      light: '#f0fdf5',
      dark: '#064e3b',
      border: '#bbf7d0',
    },
    red: {
      DEFAULT: '#F42A41',
      light: '#fef2f2',
      border: '#fecaca',
    },
    gold: {
      DEFAULT: '#C59B27',
      light: '#fef3c7',
      dark: '#92400e',
    },
  },
  statusStyles: {
    matched: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-500 text-white',
      label: 'তথ্যের মিল পাওয়া গেছে',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    mismatch: {
      bg: 'bg-rose-50 text-rose-800 border-rose-300',
      iconBg: 'bg-rose-500 text-white',
      label: 'তথ্যে অমিল',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    },
    needs_verification: {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      iconBg: 'bg-amber-500 text-white',
      label: 'আরও যাচাই প্রয়োজন',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    },
  },
};
