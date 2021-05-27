import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import { Grid, Hero } from '@components/ui';
import { FuturecasterBanner } from '@components/ui/FuturecasterBanner/FuturecasterBanner';

import { getConfig } from '@framework/api';
import getAllPages from '@framework/common/get-all-pages';
import getSiteInfo from '@framework/common/get-site-info';
import getAllProducts from '@framework/product/get-all-products';

// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({ preview, locale }: GetStaticPropsContext) {
    const config = getConfig({ locale });

    const { products } = await getAllProducts({
        variables: { first: 12 },
        config,
        preview,
    });

    const { categories, brands } = await getSiteInfo({ config, preview });
    const { pages } = await getAllPages({ config, preview });

    return {
        props: {
            products,
            categories,
            brands,
            pages,
        },
        revalidate: 14400,
    };
}

export default function Home({ products, brands, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <FuturecasterBanner />

            <Hero
                headline="Merch Details: The Futurecaster Hoodie"
                description="
        Cast your future into reality with this comfy hoodie.
        Look scary and comfy and magical all at the same time.
        Let people know that you are smart and open minded by rocking
        the a quip on the back: ‘Any sufficiently advanced technology is indistinguishable from magic.’"
            />

            <Grid layout="B">
                {products.slice(0, 3).map((product, i) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        imgProps={{
                            width: i === 0 ? 1080 : 540,
                            height: i === 0 ? 1080 : 540,
                        }}
                    />
                ))}
            </Grid>

            {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
        </>
    );
}

Home.Layout = Layout;
