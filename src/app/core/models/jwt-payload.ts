export interface JwtPayload {
  sub: string;
  exp: number;
  roles: string[]; // e.g., ['admin'] | ['manager'] | ['user']
}
