import { useEffect } from "react";

export default function Products() {
  // const { error, isLoading, sendRequest, state } = useHttpGet();

  function createSizeObject(data: any) {
    console.log(data);
  }

  useEffect(() => {}, []);

  return (
    <main>
      <p style={{ color: "white" }}>
        {/* {JSON.stringify({ error, isLoading, state, auth })} */}
      </p>

      <button>refresh</button>
    </main>
  );
}
