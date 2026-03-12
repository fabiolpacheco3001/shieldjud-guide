import matter from "gray-matter";
import type { Article } from "@/data/helpCenterData";

// Import all .md files from the content/articles directory
const markdownModules = import.meta.glob("/src/content/articles/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseArticle(raw: string): Article | null {
  try {
    const { data, content } = matter(raw);
    if (!data.title || !data.section || !data.slug) return null;
    return {
      title: data.title,
      section: data.section,
      slug: data.slug,
      content: content.trim(),
      promoted: data.promoted === true,
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
    };
  } catch {
    return null;
  }
}

// Parse all markdown files into articles
let _articles: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (_articles) return _articles;
  _articles = Object.values(markdownModules)
    .map((raw) => parseArticle(raw as string))
    .filter((a): a is Article => a !== null);
  return _articles;
}

export function getArticlesBySection(sectionId: string): Article[] {
  return getAllArticles().filter((a) => a.section === sectionId);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getPromotedArticles(): Article[] {
  return getAllArticles().filter((a) => a.promoted);
}

// Smart search: scores articles by relevance, prioritizes same-section matches
export interface SearchResult {
  article: Article;
  score: number;
  matchType: "title" | "keyword" | "content";
}

export function searchArticles(query: string, prioritySection?: string): SearchResult[] {
  if (!query.trim()) return [];
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const article of getAllArticles()) {
    const titleLower = article.title.toLowerCase();
    const contentLower = article.content.toLowerCase();
    const keywordsLower = (article.keywords || []).map((k) => k.toLowerCase());

    let score = 0;
    let matchType: SearchResult["matchType"] = "content";

    for (const term of terms) {
      // Title match (highest weight)
      if (titleLower.includes(term)) {
        score += 10;
        matchType = "title";
      }
      // Keyword match
      if (keywordsLower.some((k) => k.includes(term))) {
        score += 7;
        if (matchType !== "title") matchType = "keyword";
      }
      // Content match
      const contentMatches = (contentLower.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g")) || []).length;
      if (contentMatches > 0) {
        score += Math.min(contentMatches, 5); // cap at 5 per term
      }
    }

    // Exact title match bonus
    if (titleLower.includes(query.toLowerCase())) {
      score += 15;
    }

    // Section priority bonus
    if (prioritySection && article.section === prioritySection) {
      score += 3;
    }

    if (score > 0) {
      results.push({ article, score, matchType });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
