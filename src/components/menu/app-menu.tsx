import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { HiMenu, HiUserCircle } from "react-icons/hi";
import { colors } from "@/constants";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";
import { MobileMenu } from "./mobile-menu";
import { DesktopMenu } from "./desktop-menu";

interface MenuHeadProps {
  onClick: () => void;
}

const MenuHead = ({ onClick }: MenuHeadProps) => {
  const { user } = useAuthContext();

  return (
    <div className="flex items-center justify-between lg:hidden p-5 bg-gray-800">
      <HiMenu size={36} onClick={onClick} color={colors.white} />
      <div className="flex items-center">
        <HiUserCircle className="mr-1" size={42} color="whitesmoke" />
        <div>
          <p className="text-sm text-white">Usuario:</p>
          <p className="text-md text-white">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export const AppMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  return (
    <>
      <MenuHead onClick={handleShowMobileMenu} />
      <MobileMenu
        visible={showMobileMenu}
        onClose={handleShowMobileMenu}
        onClickLogout={handleSignOut}
      />
      <DesktopMenu onClickLogout={handleSignOut} />
    </>
  );
};
