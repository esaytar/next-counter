import "./globals.css";

export const metadata = {
  title: "тик-так",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="clock.png" sizes="any" />
      </head>
      <body className={`select-none w-full h-screen bg-green-200 p-2.5 text-[#222222] flex justify-center`}>
        {children}
      </body>
    </html>
  );
}
