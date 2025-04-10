import AnimatedLink from "./tools/AnimatedLink";

const Header = () => {
  return(
    <nav className="w-full h-auto flex flex-row justify-between uppercase text-lg px-2 py-4 whitespace-nowrap z-40 bg-white">
      <div className="flex flex-col items-start leading-tight">
        <AnimatedLink href="/" className="flex text" text="johnny carretes" />
        <AnimatedLink href="/work" className="flex text" text="work" />
      </div>
      <div className="flex flex-col items-end leading-tight">
        <AnimatedLink href="/about" className="flex text" text="about" />
        <AnimatedLink href="https://www.instagram.com/johnny_carretes/" className="flex text" text="instagram" />
      </div>
    </nav>
  )
}

export default Header;