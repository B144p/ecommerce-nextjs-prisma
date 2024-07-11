import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

async function Page({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}

export default Page;
