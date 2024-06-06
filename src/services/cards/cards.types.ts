export interface CardsListResponse {
  items: Card[]
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GradeType = 0 | 1 | 2 | 3 | 4 | 5

export interface Card {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: GradeType
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: string
  userId: string
}

export interface GetCardsArgs {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string | undefined
  question?: string
}

export interface CardArgs {
  answer: string
  answerImg?: File | null | string
  answerVideo?: null | string
  id: string
  question: string
  questionImg?: File | null | string
  questionVideo?: null | string
}

export type UpdateCardArgs = {
  cardId: string
  data: FormData
}

export type CreateCardArgs = {
  data: CardArgs
  deckId: string
}
