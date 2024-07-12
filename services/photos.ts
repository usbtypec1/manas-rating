export const PHOTOS_BLACKLIST_APPLICATION_NUMBERS: string[] = []

export const buildApplicantPhotoUrl = (applicantId: string): string => {
  return `https://abiturient.manas.edu.kg/page/uploads/photo/${applicantId}.jpg`
}
