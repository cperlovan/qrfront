"use client";

import QRForm from "../components/QRForm";
import QRList from "../components/QRList";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de QR Dinámicos</h1>
      <QRForm onSuccess={() => window.location.reload()} />
      <QRList />
    </div>
  );
}
