export const PHOTOS_BLACKLIST_APPLICATION_NUMBERS: string[] = [
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
]

export const buildApplicantPhotoUrl = (applicantId: string): string => {
  return `https://abiturient.manas.edu.kg/page/uploads/photo/${applicantId}.jpg`
}
