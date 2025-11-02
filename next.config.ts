import type { NextConfig } from "next";

const isGithubPages = Boolean(process.env.NEXT_PUBLIC_GITHUB_PAGES);

const repoName = "myprogress";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  basePath: isGithubPages ? `/${repoName}` : undefined,
  trailingSlash: true,
};

export default nextConfig;
