/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { photosCtx, Tphoto } from "../../context/PhotosCtx";
import fetcher from "../fetcher";
import removeDuplicates from "../removeDuplicates";

type Props = {
  page: number;
};

/* 
  usePhotos hook needs page prop and returns
  {
    data - current page data
    photos - all photos that have been loaded for current search query
    error
    isValidating
  }
*/

const usePhotos = ({ page }: Props) => {
  const ctx = useContext(photosCtx);
  const [photos, setPhotos] = useState<Tphoto[]>([]);
  const { data, isValidating, error } = useSWR(
    `api/photos/?searchQuery=${ctx?.currentSearchQuery.toLowerCase()}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

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

  return { data, error, isValidating, photos };
};

export default usePhotos;
