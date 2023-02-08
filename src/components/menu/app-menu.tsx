import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { colors } from "@/constants";
import { useAuthContext } from "@/providers/auth-provider/use-auth-context";
import { MobileMenu } from "./mobile-menu";
import { DesktopMenu } from "./desktop-menu";

const MobileMenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-center justify-between lg:hidden p-5 bg-gray-800">
      <HiMenu size={36} onClick={onClick} color={colors.white} />
    </div>
  );
};

export const AppMenu = () => {
  const { logout } = useAuthContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <MobileMenuButton onClick={handleShowMobileMenu} />
      <MobileMenu
        visible={showMobileMenu}
        onClose={handleShowMobileMenu}
        onClickLogout={handleLogout}
      />
      <DesktopMenu onClickLogout={handleLogout} />
    </>
  );
};
