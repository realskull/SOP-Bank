export const lastAcademicLevels = [
  'High School',
  'Post-Secondary Certificate',
  'Post-Secondary Diploma',
  'Associate Degree',
  'Bachelor',
  'Master',
  'PhD',
  'Post-Doctoral'
];

export const fieldsOfStudy = [
  'Medical',
  'IT',
  'Business',
  'Engineering',
  'Arts',
  'Law',
  'Social Sciences',
  'Environmental Science',
  'Mathematics'
];

// Language Tests and their corresponding proficiency options
export const languageTests = [
  { value: 'IELTS', label: 'IELTS' },
  { value: 'TOEFL', label: 'TOEFL' },
  { value: 'PTE', label: 'PTE' },
  { value: 'CEFR', label: 'CEFR' }
];

export const ieltsBands = ['9', '8.5', '8', '7.5', '7', '6.5', '6', '5.5', '5', 'Below 5'];
export const toeflScores = ['120-115', '114-110', '109-105', '104-100', '99-95', '94-90', '89-85', '84-80', '79-75', 'Below 75'];
export const pteScores = ['90-85', '84-80', '79-70', 'Below 70'];
export const cefrLevels = ['C2', 'C1', 'B2', 'B1', 'A2', 'A1'];

export const proficiencyOptions = {
  IELTS: ieltsBands,
  TOEFL: toeflScores,
  PTE: pteScores,
  CEFR: cefrLevels
};

// src/utils/proficiencyConverter.js

// Convert common score (0-100) to test-specific score or band
export const commonToTestScore = (commonScore, testType) => {
  switch (testType) {
      case 'IELTS':
          if (commonScore >= 90) return '9';
          if (commonScore >= 85) return '8.5';
          if (commonScore >= 80) return '8';
          if (commonScore >= 75) return '7.5';
          if (commonScore >= 70) return '7';
          if (commonScore >= 65) return '6.5';
          if (commonScore >= 60) return '6';
          if (commonScore >= 55) return '5.5';
          return '5';

      case 'PTE':
          if (commonScore >= 90) return '90-85';
          if (commonScore >= 80) return '84-80';
          if (commonScore >= 70) return '79-70';
          if (commonScore >= 60) return '69-60';
          if (commonScore >= 50) return '59-50';
          return 'Below 50';

      case 'TOEFL':
          if (commonScore >= 90) return '120-115';
          if (commonScore >= 80) return '114-110';
          if (commonScore >= 70) return '109-105';
          if (commonScore >= 60) return '104-100';
          if (commonScore >= 50) return '99-95';
          if (commonScore >= 40) return '94-90';
          if (commonScore >= 30) return '89-85';
          return 'Below 85';

      case 'CEFR':
          if (commonScore >= 90) return 'C2';
          if (commonScore >= 80) return 'C1';
          if (commonScore >= 70) return 'B2';
          if (commonScore >= 60) return 'B1';
          if (commonScore >= 50) return 'A2';
          return 'A1';

      default:
          throw new Error('Unsupported test type');
  }
};

