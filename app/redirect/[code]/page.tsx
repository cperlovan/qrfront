"use client";
import { useEffect } from "react";
//import { useRouter } from "next/navigation";
import { getQRByCode } from "../../../services/api";

export default function QRRedirectPage({ params }: { params: { code: string } }) {
 // const router = useRouter();

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await getQRByCode(params.code);
        if (response.data.url) {
          window.location.href = response.data.url; // 🔴 Redirige a la URL almacenada
        }
      } catch (error) {
        console.error("Error al obtener el QR:", error);
      }
    };

    fetchQR();
  }, [params.code]);

  return <p>Redirigiendo...</p>;
}
