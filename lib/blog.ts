import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  featured?: boolean
  content: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  featured?: boolean
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author || 'GigWageCalc Team',
    readingTime: readingTime(content).text,
    tags: data.tags || [],
    featured: data.featured || false,
    content,
  }
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs()
  
  const posts = slugs
    .map(slug => {
      const post = getPostBySlug(slug)
      // Return metadata only (without content)
      const { content, ...metadata } = post
      return metadata
    })
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return posts
}

/**
 * Get featured posts for homepage
 */
export function getFeaturedPosts(limit: number = 3): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, limit)
}

/**
 * Get related posts by tags
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMetadata[] {
  const currentPost = getPostBySlug(currentSlug)
  const allPosts = getAllPosts()
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)
  
  // Score posts by number of matching tags
  const scoredPosts = otherPosts.map(post => {
    const matchingTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length
    
    return { ...post, score: matchingTags }
  })
  
  // Sort by score (most matching tags first), then by date
  return scoredPosts
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)
}