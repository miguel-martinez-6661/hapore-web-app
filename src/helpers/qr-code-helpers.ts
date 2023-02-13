import QRCode from "qrcode";

export const generateQR = async (qrCodeKey: string) => {
  try {
    const qrCode = await QRCode.toDataURL(qrCodeKey);
    console.log(qrCode);
    return qrCode;
  } catch (err) {
    console.error(err);
  }
};
