// Simple test to verify the new translation key exists
const { translations } = require('./assets/config/translations.ts');

console.log('Testing translation key: summary-lw-branch-manager');

// Test English translation
const enTranslations = translations.get('en');
const enTranslation = enTranslations?.get('summary-lw-branch-manager');
console.log('English translation:', enTranslation ? 'Found' : 'NOT FOUND');
if (enTranslation) {
  console.log('EN:', enTranslation.substring(0, 50) + '...');
}

// Test Afrikaans translation
const afTranslations = translations.get('af');
const afTranslation = afTranslations?.get('summary-lw-branch-manager');
console.log('Afrikaans translation:', afTranslation ? 'Found' : 'NOT FOUND');
if (afTranslation) {
  console.log('AF:', afTranslation.substring(0, 50) + '...');
}