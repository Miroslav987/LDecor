import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import ModalProvider from "@/context/ModalProvider";
import StoreProvider from "./StoreProvider";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

  export const metadata: Metadata = {
    title: "LDecor",
    description: "Эль Декор — магазин, где можно заказать готовые шторы и индивидуальный пошив",
    keywords: 'шторы , пошив, магазин',

    openGraph: {
      title: "LDecor",
      description: "Эль Декор — магазин, где можно заказать готовые шторы и индивидуальный пошив",
      // url: "https://anishops.vercel.app/",
      // images: [
      //   "https://firebasestorage.googleapis.com/v0/b/onlineshop-4f347.appspot.com/o/logo%2Fanishop.png?alt=media&token=edd7237f-7bf7-4742-ad6c-7b11a81014d0",
      // ],
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <html lang="ru">
      <head>
      <meta name="theme-color" content="#58361e" />
      </head>
      <body className="antialiased">

        <StoreProvider>
          <ModalProvider>
              <NavBar />
              {children}
              <SpeedInsights />
              <Footer />
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  </>
  );
}


