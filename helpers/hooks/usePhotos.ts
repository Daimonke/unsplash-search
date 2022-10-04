/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { photosCtx, Tphoto } from "../../context/PhotosCtx";
import fetcher from "../fetcher";
import removeDuplicates from "../removeDuplicates";

type Props = {
  ref: MutableRefObject<HTMLDivElement> | MutableRefObject<null>;
};

// usePhotos HOOK, needs REF prop of main element that contains photos to track scrolling and load more photos on scroll

const usePhotos = ({ ref }: Props) => {
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
    }
  }, [data]);

  const handleScroll = () => {
    const mainRef = ref as any;
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

  return { error, isValidating, photos };
};

export default usePhotos;
