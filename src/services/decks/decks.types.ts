export interface DecksListResponse {
  items: Deck[]
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Deck {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
}

// from https://api.flashcards.andrii.es/reference#tag/decks/get/v2/decks
export interface GetDecksArgs {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export interface CreateDeckArgs {
  cover?: string
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = { id: string } & Partial<CreateDeckArgs>
export type DeleteDeckArgs = { id: string }

export type LearnDeckArgs = {
  id: string
  previousCardId?: string
}

export type UpdateGradeArgs = {
  cardId: string
  grade: number
  id: string
}

export interface GetDeckArgs {
  id: string
}

export interface GetDeckResponse {
  author: Author
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface RandomCardResponse {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: string
}

export type NewGradeData = {
  cardId: string
  grade: number
}

export type DeckMinMaxCardsResponse = {
  max: number
  min: number
}

// Error Message
// export type ApiError = {
//   data: DataErrorType
//   status: number
// }
//
// type DataErrorType = {
//   message: string
//   statusCode: number
// }
