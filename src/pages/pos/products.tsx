import { useEffect } from "react";
import useHttpGet from "../../hooks/use-http-get";
import useHttpPost from "../../hooks/use-http-post";

export default function Products() {
  const { error, isLoading, sendRequest } = useHttpPost();

  function createSizeObject(name: string, data: any) {
    console.log(data)
    return { name };
  }
  function createZise(name: string) {
    const size = { name };
    sendRequest({ url: "/sizes", data: size }, createSizeObject.bind(null,name));
  }

  return (
    <main>
      <p
        onClick={() => createZise(Math.random().toString())}
        style={{ color: "white" }}
      >
        {JSON.stringify({ error, isLoading })}
      </p>
    </main>
  );
}
