import "./globals.css";

export const metadata = {
  title: "Sensei Tattoo — Studio de tatouage",
  description:
    "Sensei Tattoo : studio de tatouage. Flash, projets sur-mesure et produits de soin pour vos tatouages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
