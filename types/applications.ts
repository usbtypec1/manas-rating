export interface BachelorApplicant {
  id: string
  rating: number
  primary_score: number
  secondary_score: number
  created_at: string
  is_passed: boolean
  photo_url: string
}

export interface MYOApplicant {
  ort_certificate_number: string
  rating: number
  ort_score: number
  created_at: string
  is_passed: boolean
}

export interface SportsAndArtApplicant {
  id: string
  rating: number
  natural_sciences_score: number
  humanitarian_sciences_score: number
  general_sciences_score: number
  created_at: string
  photo_url: string
}
