declare namespace API {
  interface SearchParams {
    keywords: string
    limit?: number
    offset?: number
    type?: 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000
  }
}
