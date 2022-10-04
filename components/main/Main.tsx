import { useContext, useEffect, useRef, useState } from "react";
import { photosCtx } from "../../context/PhotosCtx";
import usePhotos from "../../helpers/hooks/usePhotos";
import Notification from "../common/Notification";
import Spinner from "../common/Spinner";
import GridItem from "./GridItem";

const Main = () => {
  const ref = useRef(null);
  const ctx = useContext(photosCtx);
  const [page, setPage] = useState(1);
  const { photos, isValidating, error, data } = usePhotos({
    page,
  });

  const handleScroll = () => {
    const mainRef = ref as any;
    if (mainRef && !error) {
      if (
        window.scrollY > mainRef.current.offsetHeight - 1500 &&
        !isValidating
      ) {
        if (data && data.data.total_pages > page) {
          setPage(page + 1);
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
    <main className="m-auto mt-4 mb-16" ref={ref}>
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
