import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// Detect if running on Windows for local testing degradation
const isWindows = process.platform === 'win32'
const FONT_DIR = isWindows 
  ? path.join(process.cwd(), '.fonts') 
  : '/usr/share/fonts/truetype/custom/'

/**
 * Validates, locates, and dynamically installs a missing font from the Google Fonts API.
 */
export async function ensureFontInstalled(fontName: string): Promise<boolean> {
  const safeFontName = fontName.replace(/[^a-zA-Z0-9- ]/g, '')
  const fileName = `${safeFontName}.ttf`
  const filePath = path.join(FONT_DIR, fileName)

  // Ensure directory exists
  if (!fs.existsSync(FONT_DIR)) {
    fs.mkdirSync(FONT_DIR, { recursive: true })
  }

  // Step A: Check System Inventory
  if (fs.existsSync(filePath)) {
    return true
  }

  try {
    // Step B: Dynamic Web API Query (Google Fonts CSS Scraper Fallback)
    let fetchTarget = fontName
    let cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fetchTarget)}:wght@400;700&display=swap`
    
    // We send a specific legacy User-Agent to force Google Fonts to return raw TTF instead of WOFF2
    let cssRes = await fetch(cssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10' }
    })
    
    // Fallback: If 400 Bad Request, CorelDraw might have appended "Regular" or "Bold" to the font name
    if (!cssRes.ok && (fetchTarget.toLowerCase().includes(" regular") || fetchTarget.toLowerCase().includes(" bold"))) {
      fetchTarget = fetchTarget.replace(/ Regular/i, "").replace(/ Bold/i, "")
      cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fetchTarget)}:wght@400;700&display=swap`
      cssRes = await fetch(cssUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10' }
      })
    }

    if (!cssRes.ok) {
      console.warn(`Font Automator: Google Fonts API returned ${cssRes.status} for [${fontName}] (tried ${fetchTarget})`)
      return false
    }

    const cssText = await cssRes.text()
    
    // Extract the first url(...) from the CSS block
    const urlMatch = cssText.match(/url\((https:\/\/[^)]+)\)/)
    if (!urlMatch || !urlMatch[1]) {
      console.warn(`Font Automator: Could not parse font URL from CSS payload for [${fontName}]`)
      return false
    }

    const fontFileUrl = urlMatch[1]

    // Step C: Stream Binary Content
    const fontRes = await fetch(fontFileUrl)
    if (!fontRes.ok) {
      console.warn(`Font Automator: Failed to download binary font for [${fontName}]`)
      return false
    }

    const arrayBuffer = await fontRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Step D: Write to Linux Directory
    fs.writeFileSync(filePath, buffer)
    console.log(`Font Automator: Successfully installed ${fileName} to ${FONT_DIR}`)

    // Step E: Rebuild OS Font Caches
    if (!isWindows) {
      execSync('fc-cache -f -v', { stdio: 'ignore' })
      console.log(`Font Automator: Rebuilt font cache via fc-cache.`)
    } else {
      console.log(`Font Automator: Skipped fc-cache system command (Windows dev environment gracefully degraded).`)
    }

    return true
  } catch (error) {
    console.error(`Font Automator: Exception installing ${fontName}`, error)
    return false
  }
}
