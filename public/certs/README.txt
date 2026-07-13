Drop the 7 certification badge images into this folder using these EXACT filenames
(PNG, transparent or white background works best):

  gsoc.png            -> GIAC Security Operations Certified (blue circle, "GSOC")
  oscp.png            -> Offensive Security OSCP (orange hexagon)
  csa.png             -> EC-Council Certified SOC Analyst (red shield, "C|S|A")
  gwapt.png           -> GIAC Web Application Penetration Tester (red circle, "GWAPT")
  google-comptia.png  -> Google Cybersecurity Certificate + CompTIA Security+ (blue badge)
  ceh.png             -> EC-Council Certified Ethical Hacker (red circle, "C|EH")
  cism.png            -> CISM (green ring, "CISM")

These are referenced in src/app/page.tsx -> certBadges array.
After adding the files, redeploy with: npx vercel --prod --yes
