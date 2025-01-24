export interface User {
  id: string
  name: string
  email: string
  oauth: {
    access_token: string
    expires_in: number
    refresh_token?: string
    expires_in_refresh?: number
  }
}
