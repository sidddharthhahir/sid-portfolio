
# How to Update Your Resume Link

This guide explains how to easily update your resume link in the portfolio without needing to modify code.

## Quick Update Steps

1. **Upload your new resume to Google Drive**
   - Go to [Google Drive](https://drive.google.com)
   - Upload your updated resume file

2. **Set sharing permissions**
   - Right-click on your resume file
   - Select "Share"
   - Click "Change to anyone with the link"
   - Set permission to "Viewer"
   - Copy the sharing link

3. **Update the portfolio**
   - Open the file: `src/config/resume.ts`
   - Replace the URL in the `url` field with your new Google Drive link
   - Optionally update the `fileName` if you want to change the display name
   - Save the file

4. **Deploy changes**
   - Your portfolio will automatically use the new resume link
   - Test the "Download Resume" button to ensure it works

## File Location

The resume configuration is stored in: `src/config/resume.ts`

## Example

```typescript
export const RESUME_CONFIG = {
  url: 'https://drive.google.com/file/d/YOUR_NEW_FILE_ID/view?usp=sharing',
  fileName: 'Your Name Resume',
};
```

## Troubleshooting

- **Resume not downloading**: Make sure the Google Drive link has proper sharing permissions
- **Link not working**: Verify the Google Drive link is correct and accessible
- **Old resume still showing**: Clear your browser cache or try in an incognito window

## Alternative File Hosting

If you prefer not to use Google Drive, you can also:
- Use Dropbox (get a direct download link)
- Host the file on your own server
- Use any other cloud storage service that provides direct links

Just replace the URL in `src/config/resume.ts` with your preferred hosting solution.
