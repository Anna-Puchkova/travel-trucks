import css from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.link}>
          View Now
        </Link>
      </main>
    </div>
  );
}
