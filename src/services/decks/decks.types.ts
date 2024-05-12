export interface DecksListResponse {
  items: Deck[]
  maxCardsCount: number
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
