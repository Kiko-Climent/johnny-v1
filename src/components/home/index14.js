import Image from "next/image";

const HomeGallery9 = ({src}) => {

  return(
    <div className="w-full h-screen relative">
      <Image 
      src={src}
      alt="Siguiente fondo"
      style={{objectFit:"cover", objectPosition:"center"}}
      placeholder="blur"
      loading="eager"
      fill
      priority
      />
    </div>
  )
}

export default HomeGallery9