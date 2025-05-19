export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-[#bfdddf] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold dark:text-black text-gray-300 mb-4">🌤️ About This Weather App</h1>

      <div className="max-w-2xl text-center dark:bg-[#70BDC2] bg-gray-700 p-6 rounded-xl shadow-lg space-y-4">
        <p className="dark:text-gray-700 text-gray-300">
          This is a <strong>responsive weather web application</strong> developed to demonstrate modern frontend development skills using Next.js and API integration.
        </p>

        <p className="dark:text-gray-700 text-gray-300">
          🌍 It provides <strong>real-time weather data</strong> using the OpenWeatherMap API. Users can search any city to view live temperature, humidity, wind speed, and weather conditions.
        </p>

        <p className="dark:text-gray-700 text-gray-300">
          🕓 The app also stores the <strong>search history locally using LocalStorage</strong>, allowing users to revisit previously searched cities without a backend.
        </p>

        <p className="dark:text-gray-700 text-gray-300">
          💡 Designed with a <strong>mobile-first approach</strong>, the UI is fully responsive and works smoothly across all devices.
        </p>

        <div className="dark:text-gray-700 text-gray-300 text-left">
          <p className="font-semibold underline mb-1">🔧 Tech Stack Used:</p>
          <ul className="list-disc list-inside">
            <li><strong>Frontend:</strong> Next.js, Tailwind CSS</li>
            <li><strong>API:</strong> OpenWeatherMap</li>
            <li><strong>Data Storage:</strong> LocalStorage</li>
            <li><strong>Deployment:</strong> Vercel</li>
          </ul>
        </div>

        <p className="dark:text-gray-700 text-gray-300">
          Made with ❤️ by <strong>Sridhar</strong>
        </p>
      </div>
    </div>
  );
}
