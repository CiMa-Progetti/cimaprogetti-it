import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cimaprogetti.it'
  const now = new Date()

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/metodo', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/progetti', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/chi-siamo', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contatti', priority: 0.8, changeFrequency: 'monthly' },
  ]

  return pages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
