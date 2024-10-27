export interface EarlyAccessRepository {
  post: (email: string) => Promise<void>;
}
