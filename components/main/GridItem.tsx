import Image, { ImageProps } from "next/image";
import { Tphoto } from "../../context/PhotosCtx";

type Props = {
  item: Tphoto;
  options?: ImageProps;
};

const GridItem = ({ item, ...options }: Props) => {
  return (
    <Image
      objectFit="cover"
      src={item.urls.regular}
      alt={item.description}
      width={400}
      height={400}
      blurDataURL={item.urls.thumb}
      placeholder="blur"
      priority
      unoptimized
      {...options}
    />
  );
};

export default GridItem;
