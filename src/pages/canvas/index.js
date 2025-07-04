import CanvasGallery4 from "@/components/canvas/index4";
import Head from "next/head";


export default function Canvas() {
  return (
    <>
      <Head>
        <title>Canvas | Johnny Carrtes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div>
        <CanvasGallery4 />
      </div>
    </>
  );
}