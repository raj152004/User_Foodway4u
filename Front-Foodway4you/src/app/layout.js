import "../styles/globals.css";
import Navbar from "@/components/Navbar";

// REDUX PROVIDER IMPORT KIYA
import { ReduxProvider } from "@/redux/provider"; 

export const metadata = {
  title: "Foodway | Exclusive Food Delivery",
  description: "Order from exclusive local partners",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        
        {/* POORI APP KO REDUX SE WRAP KIYA */}
        <ReduxProvider>
          {/* <Navbar /> */}
          
          <main className="min-h-screen">
            {children}
          </main>

          <footer className="py-10 text-center border-t bg-white">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              © 2026 Foodway Platform
            </p>
          </footer>
        </ReduxProvider>

      </body>
    </html>
  );
}