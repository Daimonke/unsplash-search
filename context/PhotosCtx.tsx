import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export type Tphotos = {
  data: {
    total: number;
    total_pages: number;
    results: unknown[];
  };
  error: string;
};

export type TphotosCtx = {
  photos: Tphotos;
  searchPhotos: (query: string, pageNumber?: number) => void;
  loading: boolean;
};

export const photosCtx = createContext<TphotosCtx | null>(null);

const PhotosCtx = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Tphotos>({
    data: {
      total: 0,
      total_pages: 0,
      results: [],
    },
    error: "",
  });

  const searchPhotos = async (query: string, pageNumber?: number) => {
    setLoading(true);
    const page = pageNumber ? pageNumber : 1;
    try {
      const { data } = await axios(
        `api/photos/?searchQuery=${query}&page=${page}`
      );
      if (data.length === 0) {
        setPhotos({
          data: data,
          error: "No photos found",
        });
      } else {
        setPhotos({
          data: data,
          error: "",
        });
      }
    } catch (err) {
      setPhotos({
        ...photos,
        error: "Something wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const ctxInitialValue: TphotosCtx = {
    photos,
    searchPhotos,
    loading,
  };

  return (
    <photosCtx.Provider value={ctxInitialValue}>{children}</photosCtx.Provider>
  );
};

export default PhotosCtx;
