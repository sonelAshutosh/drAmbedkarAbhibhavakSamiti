import './globals.css'

export const metadata = {
  title: 'Dr. Ambedkar Abhibhavak Samiti',
  description: 'NGO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-primary-base text-primary-dark dark:bg-primary-dark  dark:text-primary-base`}
      >
        {children}
      </body>
    </html>
  )
}
