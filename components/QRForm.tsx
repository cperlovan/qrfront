"use client";

import { useState } from "react";

interface QRFormProps {
  existingCode?: string;
  existingUrl?: string;
  onSuccess?: () => void; // Agregar esta prop
}

export default function QRForm({ existingCode = "", existingUrl = "", onSuccess }: QRFormProps) {
  const [code, setCode] = useState(existingCode);
  const [url, setUrl] = useState(existingUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const API_URL = "http://localhost:3060"; 

    const response = await fetch(`${API_URL}/api/qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, url }),
    });

    if (response.ok) {
      console.log("QR registrado con éxito");
      onSuccess?.(); // Llamar a onSuccess si está definido
    } else {
      console.error("Error al registrar QR");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código del producto"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL del producto"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Guardar</button>
    </form>
  );
}
