"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getQRByCode, updateQR } from "../../../services/api";

export default function EditQRPage() {
  const router = useRouter();
  const params = useParams(); // ✅ Obtiene el código dinámico
  const code = params.code as string;
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await getQRByCode(code);
        setUrl(response.data.url);
      } catch (error) {
        console.error("Error al obtener el QR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (code) fetchQR();
  }, [code]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateQR(code, url);
      alert("QR actualizado correctamente");
      router.push("/"); // ✅ Redirige al home después de actualizar
    } catch (error) {
      console.error("Error al actualizar QR:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Editar QR {code}</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Nueva URL"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Actualizar URL
        </button>
      </form>
    </div>
  );
}
