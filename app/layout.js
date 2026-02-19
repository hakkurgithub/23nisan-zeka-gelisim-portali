export const metadata = {
  title: '23 Nisan Zeka Gelişim Portalı',
  description: 'Çocuklar için bilimsel zeka oyunları',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f1faee' }}>
        {children}
      </body>
    </html>
  )
}
