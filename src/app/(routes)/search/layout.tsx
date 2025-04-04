const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
};

export default function SearchPageLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body style={backgroundStyle}>{children}</body>
      </html>
    )
  }
  