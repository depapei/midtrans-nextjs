import { Product } from "@/type/product";
import { API } from "../api/instance";
import { useQuery } from "@tanstack/react-query";

export const useDummyProduct: Product[] = [
  {
    id: "prd-001",
    name: "Sampoerna Mild",
    description:
      "Sampoerna A Mild adalah merek rokok kretek filter Low Tar Low Nicotine (LTLN) terkemuka di Indonesia, diluncurkan tahun 1989. Dikenal dengan sensasi ringan, halus, dan aroma khas, produk ini tersedia dalam varian reguler (merah) serta menthol dengan ukuran isi 12, 16, dan 50 batang.",
    price: 40000,
    discountPrice: 36000,
    imageUrl:
      "https://order.lottemart.co.id/_next/image?url=https%3A%2F%2Fcoreimages.lottemart.co.id%2Ford%2F06%2F1089165000-a&w=1920&q=75",
    rating: 5,
    reviewCount: 123890,
    stock: 1520,
  },
  {
    id: "prd-002",
    name: "Icy Mango - Icy Series",
    description:
      "FOOM Icy Mango (Fruity Series V2/MAX) adalah liquid salt nicotine yang menghadirkan perpaduan rasa mangga tropis (yellow sparks) yang bold, manis, dan sedikit asam, dengan sensasi dingin (menthol) yang kuat. Didesain untuk pod system, liquid ini memiliki komposisi VG/PG 50:50, memberikan rasa segar maksimal, throat hit yang smooth/mantap, dan tersedia dalam ukuran 15ml & 30ml. ",
    price: 125000,
    discountPrice: 110000,
    imageUrl:
      "https://foom.id/cdn/shop/files/liquid-icy-mango-fruity-series-v2-or-liquid-vape-salt-nic-enak-dan-pods-vape-terbaik-foom-32531.png?v=1760945226&width=1946",
    rating: 4.5,
    reviewCount: 32251,
    stock: 243,
  },
  {
    id: "prd-003",
    name: "Moris Wirantara",
    description:
      "Sahabat Kandung Joseph Priadi Pangukir & Zakhir Adima, CEO Victora, Belilah jika anda mampu",
    price: 300000000,
    discountPrice: 250000000,
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQGGrdSJXbWg3w/profile-displayphoto-shrink_200_200/B56ZsnbQVIJ4Ac-/0/1765893016287?e=1773273600&v=beta&t=rL9fFsawMHf9gDxxxhSZjVdT08wsve4CwTCrxI2vNcQ",
    rating: 5,
    reviewCount: 69,
    stock: 3,
  },
  {
    id: "prd-004",
    name: "Joseph Priadi Pangukir",
    description: "Seekor DevOps Victora.",
    price: 100,
    discountPrice: 1,
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQFCz13e5n0NxQ/profile-displayphoto-scale_200_200/B56ZqcOQbXG0AY-/0/1763557575159?e=1773273600&v=beta&t=o_PNUWYI51-Y_LvX1c-k6CkXdjQx3glXQeLPazrcHmo",
    rating: 5,
    reviewCount: 1324678,
    stock: 1,
  },
];

const hitDetailProduct = async (id: string): Promise<Product> => {
  const { data } = await API.get(`/api/product/${id}`);
  const product: Product = data.data.product;
  return product;
};

export const useDetailProduct = (id: string) => {
  return useQuery({
    queryFn: () => {
      return hitDetailProduct(id);
    },
    queryKey: [`product-${id}`],
  });
};
