import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const CommonLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>The Weighter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-neutral-200 rounded-lg">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
