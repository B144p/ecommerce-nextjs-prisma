import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { wait } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function getMostPopularProducts() {
  await wait(600);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: {
      orders: { _count: "desc" },
    },
    take: 6,
  });
}

async function getNewestProducts() {
  await wait(500);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: {
      createAt: "desc",
    },
    take: 6,
  });
}

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProducGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProducGridSection title="Newest" productsFetcher={getNewestProducts} />
    </main>
  );
}

type ProducGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

function ProducGridSection({ title, productsFetcher }: ProducGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/product" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
