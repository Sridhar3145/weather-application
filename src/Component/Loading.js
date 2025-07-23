import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-xl">Loading...</p>
    </div>
  );
};

export default Page;
