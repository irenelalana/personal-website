"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanPage() {

  const [result, setResult] = useState<any>(null);

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "scanner",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(
      async (decodedText) => {

        try {

          const url = new URL(decodedText);
          const parts = url.pathname.split("/t/");
          const payload = parts[1];

          const res = await fetch("/api/verify-ticket", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ payload })
          });

          const data = await res.json();
          console.log(data);
          setResult(data);

        } catch (err) {
          console.error(err);
        }

      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

      <h1>Activate Brisbane — Ticket Scanner</h1>

      <div id="scanner" style={{ maxWidth: "500px" }} />

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
            background: result.valid ? "#d1fae5" : "#fee2e2"
          }}
        >

          {result.valid ? (
            <>
              <h2>Valid Ticket</h2>
              <p><strong>{result.name}</strong></p>
              <p>{result.type}</p>
              {result.checked_in && <p>⚠ Already checked in</p>}
            </>
          ) : (
            <h2>Invalid Ticket</h2>
          )}

        </div>
      )}

    </div>
  );
}