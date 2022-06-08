import React from "react";
import Link from "next/link";

//for extracting image from sanity dashboard
import { urlFor } from "../lib/client";

const Product = ({
  product: {
    defaultProductVariant: { images },
    name,
    slug,
  },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(images && images[0])}
            height={250}
            width={250}
            className="product-image"
          />
        </div>
      </Link>
    </div>
  );
};

export default Product;
