import Head from "next/head";
import { AppMenu } from "@/components/menu/app-menu";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Hapore App</title>
        <meta name="description" content="Hapore Party Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:flex">
        <div className="w-full lg:w-1/5">
          <AppMenu />
        </div>
        <div className="lg:w-5/6">{children}</div>
      </div>
    </>
  );
}
