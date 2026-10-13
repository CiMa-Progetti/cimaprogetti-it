import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cimaprogetti.it'
  const now = new Date()

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/metodo', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/valori', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/news', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/servizi', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/progetti', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/chi-siamo', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contatti', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/chi-siamo/nicola-leone-ciardi', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/chi-siamo/valentina-madaudo', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/legale', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return pages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
