import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>No hem trobat la pàgina que cercaves!</h2>
      <p>Sempre ho podeu tornar a intentar.</p>
      <Link href="/">Torna a l’inici</Link>
    </div>
  );
}
