export const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';
export const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:5432';
export const githubAuthUrl = process.env.GITHUB_AUTH_URL || 'http://localhost:1234/auth/callback';
export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';