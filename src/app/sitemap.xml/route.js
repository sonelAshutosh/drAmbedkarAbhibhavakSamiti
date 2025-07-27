import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://dr-ambedkar-abhibhavak-samiti.vercel.app'

  const staticPages = [
    '',
    '/campaigns',
    '/gallery',
    '/certificates',
    '/school',
    '/about-us',
    '/contact-us',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
    </url>
  `
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
