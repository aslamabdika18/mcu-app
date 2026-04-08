import QRCodeStyling from "qr-code-styling";

export default function createQrCode(url: string) {
    return new QRCodeStyling({
        width: 300,
        height: 300,
        data: url,
        image: "../public/next.svg",
        dotsOptions: {
            color: "#000",
            type: "rounded",
        },
        backgroundOptions: {
            color: "#fff",
        },
    });
}