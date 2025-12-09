export default function AnalyticsCard({ stats, analytics }) {
  const maxClicks = Math.max(...analytics.map(c => c.clicks?.length || 0), 1);
  const recentDays = analytics.slice(0, 7); // Last week

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        📊 Analytics Overview
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{stats.totalUrls}</p>
          <p className="text-gray-600">Total URLs</p>
        </div>
        <div classNameName="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{stats.totalClicks}</p>
          <p className="text-gray-600">Total Clicks</p>
        </div>
      </div>
      {/* Simple Bar Chart: Divs as bars */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Recent Activity (Last 7 Days)</h4>
        <div className="space-y-2">
          {recentDays.map((url, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="w-8 text-sm font-mono">{url.shortId.slice(0,6)}...</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${(url.clicks?.length / maxClicks) * 100}%` }}
                />
              </div>
              <span className="w-8 text-sm">{url.clicks?.length || 0}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Basic Table for History */}
      {analytics.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs uppercase bg-gray-50">
              <tr><th>Timestamp</th><th>URL</th></tr>
            </thead>
            <tbody>
              {analytics.slice(0,5).map((entry, i) => (
                <tr key={i} className="border-b">
                  <td>{new Date(entry.clicks[0]?.timestamp).toLocaleString()}</td> {/* First click */}
                  <td className="font-mono">{entry.shortId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}