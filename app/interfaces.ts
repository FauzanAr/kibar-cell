export interface UserLogin {
  username: string
  password: string
}

export interface AlertItem {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}