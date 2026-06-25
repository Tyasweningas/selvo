import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/seller/",
        "/transactions/",
        "/payment-success/",
        "/api/",
      ],
    },
    sitemap: "https://selvo.web.id/sitemap.xml",
  };
}
