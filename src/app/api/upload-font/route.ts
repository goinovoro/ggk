import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)

const isWindows = process.platform === 'win32'
const FONT_DIR = isWindows 
  ? path.join(process.cwd(), '.fonts') 
  : '/usr/share/fonts/truetype/custom/'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: true, message: "No font file uploaded" },
        { status: 400 }
      )
    }

    const filename = file.name
    const ext = path.extname(filename).toLowerCase()
    
    // Validate font file format
    if (!['.ttf', '.otf', '.woff', '.woff2'].includes(ext)) {
      return NextResponse.json(
        { error: true, message: "Invalid font format. Please upload .ttf, .otf, .woff, or .woff2" },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Ensure FONT_DIR exists
    try {
      await fs.mkdir(FONT_DIR, { recursive: true })
    } catch (_) {}

    const filePath = path.join(FONT_DIR, filename)
    await fs.writeFile(filePath, buffer)

    console.log(`Font Automator: Custom font ${filename} saved to ${filePath}`)

    // Rebuild OS font cache on Linux
    if (!isWindows) {
      try {
        await execPromise('fc-cache -f -v')
        console.log("Font Automator: Rebuilt system font cache via fc-cache.")
      } catch (err) {
        console.warn("Font Automator: Failed to rebuild fc-cache:", err)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Font ${filename} uploaded and installed successfully.`
    })
  } catch (error: any) {
    console.error("Font upload error:", error)
    return NextResponse.json(
      { error: true, message: error.message || "An unexpected error occurred uploading the font" },
      { status: 500 }
    )
  }
}
