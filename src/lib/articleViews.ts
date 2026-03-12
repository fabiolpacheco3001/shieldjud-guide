const STORAGE_KEY = "shieldjud-article-views";

interface ViewCounts {
  [slug: string]: number;
}

function getViewCounts(): ViewCounts {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveViewCounts(counts: ViewCounts): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {
    // localStorage full or unavailable
  }
}

export function trackArticleView(slug: string): void {
  const counts = getViewCounts();
  counts[slug] = (counts[slug] || 0) + 1;
  saveViewCounts(counts);
}

export function getTopArticleSlugs(limit = 5): { slug: string; views: number }[] {
  const counts = getViewCounts();
  return Object.entries(counts)
    .map(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}
