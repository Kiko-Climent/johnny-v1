import Link from "next/link";

const Header = () => {
  return(
    <nav className="w-full h-auto flex flex-row justify-between uppercase text-lg px-2 py-4 whitespace-nowrap z-40 bg-white">
      <div className="flex flex-col items-start">
        <Link href="/" className="flex -mb-2">Johnny Carretes</Link>
        <div className="flex">work</div>
      </div>
      <div className="flex flex-col items-end">
        <Link href="/about" className="flex -mb-2">about</Link>
        <div className="flex">instagram</div>
      </div>
    </nav>
  )
}

export default Header;