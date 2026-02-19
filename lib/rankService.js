export const calculateRank = (xp) => {
  if (xp >= 1500) return { title: 'Dahi', color: '#e63946' };
  if (xp >= 500) return { title: 'Usta', color: '#457b9d' };
  return { title: 'Çırak', color: '#1d3557' };
};
