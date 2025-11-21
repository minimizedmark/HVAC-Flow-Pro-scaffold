export default {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  async redirects() {
    return [
      // wildcard redirect support for magic link preview URLs (Vercel)
      {
        source: "/auth/confirm/:path*",
        destination: "/auth/confirm",
        permanent: false
      }
    ];
  }
};
