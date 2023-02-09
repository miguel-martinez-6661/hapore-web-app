import Head from "next/head";
import { AppMenu } from "@/components/menu/app-menu";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  // const { isLoggedIn } = useAuthContext();
  // const { replace } = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     replace("/auth/login");
  //   }
  // }, [isLoggedIn, replace]);

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
};

export default Page;
