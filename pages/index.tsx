import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import PhotosCtx from "../context/PhotosCtx";

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl m-auto p-2">
      <Head>
        <title>Images search</title>
        <meta
          name="description"
          content="App for searching images with unsplash api"
        />
      </Head>
      <PhotosCtx>
        <Header />
        <Main />
      </PhotosCtx>
    </div>
  );
};

export default Home;
