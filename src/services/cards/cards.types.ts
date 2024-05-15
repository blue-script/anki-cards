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

export interface Card {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
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

export interface CreateCardArgs {
  id: string
}
