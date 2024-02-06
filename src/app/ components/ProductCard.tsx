import Link from "next/link";
import Image from "next/image";
  
  interface ProductCardProps {
    product: Products;
  }

export default function ProductCard({product}:ProductCardProps) {

  return (
    <div>
      <div>
       <Link href={'/product/'+product.fields.slug}>
        <Image src={'http:'+ product.fields.image[0].fields.file.url} width={300} height={300} alt="shoes" className="rounded object-cover w-96 h-96"/>
      <h4>{product.fields.title}</h4>
      <p>{product.fields.price}</p>
      </Link>
      </div>
    </div>
  )
}
