
export const metadata = {
  title: 'Immobilier - ImmOcean Maroc',
  description: "Un moyen facile de trouver une propriété parfaite Nous fournissons un service complet pour la vente, l'achat ou la location de biens immobiliers. Nous opérons depuis plus de 10 ans. Recherchez des millions d'appartements et de maisons sur ImmOcean",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  )
}
