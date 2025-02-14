"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getQRByCode } from "../../../services/api";

export default function QRRedirectPage() {
  const params = useParams(); // ✅ Obtiene el código dinámico
  const code = params.code as string;

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await getQRByCode(code);
        if (response.data.url) {
          window.location.href = response.data.url; // ✅ Redirige a la URL guardada
        }
      } catch (error) {
        console.error("Error al obtener el QR:", error);
      }
    };

    if (code) fetchQR(); // ✅ Solo ejecuta si el código existe
  }, [code]);

  return <p>Redirigiendo...</p>;
}
