import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner";


export default function Home() {
  return (
    <>
      <Banner />
      <main className="container py-5">
        <h2 className="h4 mb-3">Destacados</h2>
        <p className="text-body-secondary">
          Aquí puedes mostrar productos destacados, promos o testimonios.
        </p>
      </main>
    </>
  );
}
