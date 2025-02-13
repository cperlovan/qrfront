import { useEffect, useState } from "react";
import { getQRs } from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function QRList() {
  const [qrs, setQRs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchQRs();
  }, []);

  const fetchQRs = async () => {
    try {
      const response = await getQRs();
      setQRs(response.data);
    } catch (error) {
      console.error("Error al obtener los QR:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Códigos QR Generados</h2>
      <ul>
        {qrs.map((qr) => {
          const qrUrl = `http://localhost:3060/api/redirect/${qr.code}`;
          
          console.log("URL generada en QR:", qrUrl); // 🚀 VERIFICAR QUE SEA LA CORRECTA

          return (
            <li key={qr.code} className="border p-2 mb-2 flex justify-between">
              <div>
                {/* ⬇️ Renderiza correctamente el QR con la URL */}
                <QRCodeCanvas value={qrUrl} size={256} />
                <p>{qr.code} - {qr.url}</p>
              </div>
              <button 
                className="text-blue-500 underline"
                onClick={() => router.push(`/qr/${qr.code}`)}
              >
                Editar
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
