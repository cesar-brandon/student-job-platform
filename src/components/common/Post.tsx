"use client";
import { useEffect, useState } from "react";

interface Props {
  token: string;
}

const Post = ({ token }: Props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/1`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, [token]);

  return (
    <main>
      <div>
        {data.map((item: any) => (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;
