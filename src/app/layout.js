import "./globals.css";
import { Ubuntu } from "next/font/google";
import AppContextProvider from "./Context/AppContext";
import BackgroundImage from "./component/BackgroundImage";
import StepNavigation from "./component/StepNavigation/StepNavigation";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "multi-step-form",
  description: "challenge: multi step form by frontendmentor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <AppContextProvider>
        <body className={`${ubuntu.className} h-full`}>
          <div className="flex flex-col lg:flex-row h-full relative">
            <aside className="lg:min-w-[17.125rem] p-9 relative text-white h-[172px] lg:h-auto">
              <BackgroundImage />
              <StepNavigation />
            </aside>
            <div className="grow">
              <main className="h-full min-w-full lg:px-10 xl:px-28 mx-auto bg-magnolia lg:bg-white flex lg:block flex-col">
                {children}
              </main>
            </div>
          </div>
        </body>
      </AppContextProvider>
    </html>
  );
}
