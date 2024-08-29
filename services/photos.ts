export const PHOTOS_BLACKLIST_APPLICATION_NUMBERS = new Set<string>([
  '24005554',
  '24006514',
  '24001338',
  '24000265',
  '24007410',
  '24000378',
  '24005199',
  '24004028',
  '24009135',
  '24002005',
  '24001115',
  '24000804',
  '24004881',
])

export const isAllowedToShowPhoto = (applicantId: string): boolean => !PHOTOS_BLACKLIST_APPLICATION_NUMBERS.has(applicantId)
