import '../globals.css'

export const metadata = {
  title: 'Create Account',
  description: 'Create your account',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}