import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header/Header";

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl m-auto p-2">
      <Head>
        <title>Images search</title>
        <meta
          name="description"
          content="App for searching images from unsplash"
        />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
