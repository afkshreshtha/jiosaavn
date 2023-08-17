import MusicPlayer from "./components/MusicPlayer";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: "Spotify",
};
export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <body>
          <div className="relative flex">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:pl-64">
              {" "}
              {/* Add padding-left to avoid content overlap */}
              <Searchbar />
              <div className="flex-1 pb-40 px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">
                  <Providers>
                    {children}
                    <div className="fixed bottom-0 left-0 w-full h-30  bg-gray-500">
                      <MusicPlayer />
                      <div className="md:hidden">
                        <MobileNav />
                      </div>
                    </div>
                    <ToastContainer/>
                  </Providers>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>

  );
}
