import React, { useState } from "react";
import { HiMenu, HiUserCircle } from "react-icons/hi";
import { colors } from "@/constants";
import { MobileMenu } from "./mobile-menu";
import { DesktopMenu } from "./desktop-menu";
import { signOut } from "next-auth/react";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";

const MobileMenuButton = ({ onClick }: { onClick: () => void }) => {
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

  return (
    <>
      <MobileMenuButton onClick={handleShowMobileMenu} />
      <MobileMenu
        visible={showMobileMenu}
        onClose={handleShowMobileMenu}
        onClickLogout={signOut}
      />
      <DesktopMenu onClickLogout={signOut} />
    </>
  );
};
