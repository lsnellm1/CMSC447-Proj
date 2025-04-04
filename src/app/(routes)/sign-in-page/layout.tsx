const backgroundStyle = {
  backgroundImage: 'url("https://styleguide.umbc.edu/wp-content/uploads/sites/113/2019/05/maryland-flag-backgrounds-landscape-gray.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh', // This makes the background cover the entire viewport height
  width: '100%',
};

export default function SignInPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={backgroundStyle}>
        <>
          {children}   
        </>
        </body>
    </html>
  )
}
