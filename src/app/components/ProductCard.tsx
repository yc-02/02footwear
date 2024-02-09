import Link from "next/link";
import Image from "next/image";
import { Products } from "../../../types";
  
  interface ProductCardProps {
    product: Products;
  }

export default function ProductCard({product}:ProductCardProps) {
  const imageWH=product.fields.image[0].fields.file.details.image
  console.log(imageWH)
  const imageUrl = product.fields.image[0].fields.file.url;
  console.log(imageUrl);
  return (
    <div>
      <div>
       <Link href={'/product/'+product.fields.slug}>
        <Image src={'http:'+ imageUrl} width={imageWH.width} height={imageWH.height} alt="shoes" className="rounded object-cover"/>
      <h4>{product.fields.title}</h4>
      <p>${product.fields.price}</p>
      </Link>
      </div>
    </div>
  )
}
