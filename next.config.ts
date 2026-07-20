import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const usesCustomDomain =
  process.env.CUSTOM_DOMAIN === "riyadhcityhotelapartments.com";
const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !usesCustomDomain
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
