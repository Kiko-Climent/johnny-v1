import Head from "next/head";


export default function About() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PageTransition> */}
        <div className="text-black text-4xl flex justify-center items-center h-screen w-screen">
          about johnny carretes
        </div>
      {/* </PageTransition> */}
    </>
  );
}