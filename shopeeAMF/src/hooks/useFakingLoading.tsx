import { useState, useEffect } from "react";

function useFakeLoading(duration = 1500) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return loading;
}

export { useFakeLoading };
