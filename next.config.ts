import type { NextConfig } from "next";

const buildTime = new Date().toISOString();
const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  "v2.0-release";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: "2.0.0",
    NEXT_PUBLIC_BUILD_TIME: buildTime,
    NEXT_PUBLIC_COMMIT_SHA: commitSha,
  },
};

export default nextConfig;
