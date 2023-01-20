import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/use-axios-private";
import useHttpGet from "../../hooks/use-http-get";
import useRefreshToken from "../../hooks/use-refresh-token";

export default function Products() {
  const { error, isLoading, sendRequest, status } = useHttpGet();

  return (
    <main>
      <p style={{ color: "white" }}>
        {JSON.stringify({ error, isLoading, status })}
      </p>

      <button
        onClick={() =>
          sendRequest("consumables", (data: any) => console.log(data))
        }
      >
        refresh
      </button>
    </main>
  );
}
