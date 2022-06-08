import React from "react";

import { client, urlFor } from "../../lib/client";

const ProductDetails = ({
  product: {
    defaultProductVariant: { images },
  },
  products,
}) => {
  return (
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(images && images[0])} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type== "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};

export const getStaticPaths = async () => {
  const products = await client.fetch(`*[_type== "product"]`);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return { paths, fallback: true };
};
