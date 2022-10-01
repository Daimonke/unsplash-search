/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { photosCtx, Tphoto } from "../../context/PhotosCtx";
import fetcher from "../../helpers/fetcher";
import removeDuplicates from "../../helpers/removeDuplicates";
import Notification from "../common/Notification";
import Spinner from "../common/Spinner";
import GridItem from "./GridItem";

const Main = () => {
  const main = useRef(null);
  const ctx = useContext(photosCtx);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<Tphoto[]>([]);
  const { data, isValidating, error } = useSWR(
    `api/photos/?searchQuery=${ctx?.currentSearchQuery.toLowerCase()}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const loadMorePhotos = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // remove old images for smooth new images load
    if (ctx?.isQueryNew) setPhotos([]);

    if (error) return;
    if (data) {
      if (ctx?.isQueryNew) {
        setPhotos(data.data.results);
        ctx.setIsQueryNew(false);
      } else {
        setPhotos(removeDuplicates([...photos, ...data.data.results], "id"));
      }
      console.log(data);
    }
  }, [data]);

  const handleScroll = () => {
    const mainRef = main as any;
    if (mainRef && !error) {
      if (
        window.scrollY > mainRef.current.offsetHeight - 1500 &&
        !isValidating
      ) {
        if (data && data.data.total_pages > page) {
          loadMorePhotos();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  if (error && photos.length === 0)
    return <Notification>Something wrong...</Notification>;
  if (!isValidating && photos.length === 0) {
    return <Notification>No photos found..</Notification>;
  }
  return (
    <main className="m-auto mt-4 mb-16" ref={main}>
      {photos.length > 0 && (
        <h1 className="w-full text-gray-700 font-bold text-xl">
          {ctx?.currentSearchQuery.toUpperCase()}
        </h1>
      )}
      <div className="autoGrid justify-center gap-2 mt-4 m-auto">
        {photos.map((item, i) => (
          <GridItem item={item} key={i} />
        ))}
      </div>
      {isValidating && <Spinner />}
    </main>
  );
};

export default Main;
