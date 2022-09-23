import React, { createContext, useState } from "react";

export type Tphoto = {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: any;
  current_user_collections: any;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
};

export type TphotosRes = {
  total: number;
  total_pages: number;
  results: Tphoto[];
};

export type TphotosCtx = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const photosCtx = createContext<TphotosCtx | null>(null);

const PhotosProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const ctxInitialValue: TphotosCtx = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <photosCtx.Provider value={ctxInitialValue}>{children}</photosCtx.Provider>
  );
};

export default PhotosProvider;
