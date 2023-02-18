/**
 * Get current date in timezone
 * @param {string} timezone
 * @returns {Date} date in timezone
 */
export function getCurrentDateInTimezone(timezone: string): Date {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  const timezoneDate = new Date(date.getTime() + timezoneOffset);
  const timezoneString = timezoneDate.toLocaleString('en-US', {
    timeZone: timezone,
  });
  return new Date(timezoneString);
}

// function for format date with pattern string
/**
 * Format date with pattern string
 * @param {Date} date date object
 * @param {string} pattern pattern string
 * @returns {string} formatted date string
 */
export function formatDate(date: Date, pattern: string): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return pattern
    .replace('dd', day < 10 ? `0${day}` : `${day}`)
    .replace('MM', month < 10 ? `0${month}` : `${month}`)
    .replace('yyyy', `${year}`)
    .replace('HH', hours < 10 ? `0${hours}` : `${hours}`)
    .replace('mm', minutes < 10 ? `0${minutes}` : `${minutes}`)
    .replace('ss', seconds < 10 ? `0${seconds}` : `${seconds}`);
}

/**
 * Timezone constants
 */
export const Timeszone = {
  Europe: {
    Moscow: 'Europe/Moscow',
    London: 'Europe/London',
    Paris: 'Europe/Paris',
    Berlin: 'Europe/Berlin',
    Kiev: 'Europe/Kiev',
    Rome: 'Europe/Rome',
    Madrid: 'Europe/Madrid',
    Amsterdam: 'Europe/Amsterdam',
    Stockholm: 'Europe/Stockholm',
    Vienna: 'Europe/Vienna',
    Warsaw: 'Europe/Warsaw',
  },
  Africa: {
    Nairobi: 'Africa/Nairobi',
    Cairo: 'Africa/Cairo',
    Johannesburg: 'Africa/Johannesburg',
    Algiers: 'Africa/Algiers',
    Casablanca: 'Africa/Casablanca',
    Lagos: 'Africa/Lagos',
    Khartoum: 'Africa/Khartoum',
    Tunis: 'Africa/Tunis',
  },
  America: {
    Toronto: 'America/Toronto',
    NewYork: 'America/New_York',
    Chicago: 'America/Chicago',
    LosAngeles: 'America/Los_Angeles',
    Vancouver: 'America/Vancouver',
    MexicoCity: 'America/Mexico_City',
    Lima: 'America/Lima',
    Bogota: 'America/Bogota',
  },
  Asia: {
    Almaty: 'Asia/Almaty',
    Oral: 'Asia/Oral',
    Yerevan: 'Asia/Yerevan',
    Dubai: 'Asia/Dubai',
    Kabul: 'Asia/Kabul',
    Karachi: 'Asia/Karachi',
    Tashkent: 'Asia/Tashkent',
    Dhaka: 'Asia/Dhaka',
    Colombo: 'Asia/Colombo',
    Bangkok: 'Asia/Bangkok',
    Hanoi: 'Asia/Hanoi',
    Jakarta: 'Asia/Jakarta',
  },
};
