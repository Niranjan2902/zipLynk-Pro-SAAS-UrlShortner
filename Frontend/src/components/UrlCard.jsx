import { Copy, ExternalLink, QrCode as QrIcon, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';   // Fixed: named import
import { useState } from 'react';

export default function URLCard({ url }) {
  const [showQR, setShowQR] = useState(false);

  const shortUrl = `http://localhost:8001/url/${url.shortId}`;

  const copyToClipboard = (text, e) => {
    navigator.clipboard.writeText(text);
    const btn = e.target.closest('button') || e.target;
    const original = btn.innerText || 'Copy';
    btn.innerText = 'Copied!';
    setTimeout(() => btn.innerText = original, 2000);
  };

  const downloadQR = () => {
    const canvas = document.getElementById(`qr-${url.shortId}`);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${url.shortId}-qr.png`;
    link.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <a href={url.redirectURL} className="text-sm text-gray-500 truncate flex-1 mr-2" target="_blank" rel="noopener">
          {url.redirectURL}
        </a>
        <ExternalLink className="h-4 w-4 text-blue-500" />
      </div>

      <div className="flex justify-between items-center">
        <a href={shortUrl} className="font-mono text-blue-600 hover:underline">
          / {url.shortId}
        </a>
        <div className="flex gap-1">
          <button onClick={(e) => copyToClipboard(shortUrl, e)} className="p-1 text-gray-500 hover:text-blue-500">
            <Copy className="h-4 w-4" />
          </button>
          <button onClick={() => setShowQR(!showQR)} className="p-1 text-gray-500 hover:text-blue-500">
            <QrIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        {url.clicks.length} clicks • {new Date(url.createdAt).toLocaleDateString()}
      </div>

      {/* QR Code – Instant, No Backend */}
      {showQR && (
        <div className="mt-3 text-center border-t pt-3">
          <div className="inline-block p-2 bg-white rounded-lg shadow">
            <QRCodeCanvas
              id={`qr-${url.shortId}`}
              value={shortUrl}
              size={160}
              level="M"
              includeMargin
            />
          </div>
          <button
            onClick={downloadQR}
            className="mt-2 flex items-center gap-1 mx-auto text-xs text-blue-600 hover:underline"
          >
            <Download className="h-3 w-3" /> Download
          </button>
        </div>
      )}
    </div>
  );
}