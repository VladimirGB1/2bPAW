import Link from "next/link";


export default function Home() {
    return(
        <div>
            <h1>Página Home</h1>
            <Link href="/login">Página de Login</Link>
        </div>
    )
}