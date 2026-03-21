"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setSubscribers(data);
        setLoading(false);
      });
  }, [router]);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <div className="mb-10">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
          Newsletter
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Subscribers
        </h1>
        <p className="font-body text-sm text-on-surface-variant font-light mt-2">
          {subscribers.length} active subscriber{subscribers.length !== 1 && "s"}
        </p>
      </div>

      {loading ? (
        <p className="font-body text-sm text-on-surface-variant">Loading...</p>
      ) : subscribers.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low">
          <p className="font-headline text-xl italic text-on-surface-variant">
            No subscribers yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-outline-variant/20">
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className="bg-surface p-5 flex items-center justify-between"
            >
              <p className="font-body text-sm font-light">{sub.email}</p>
              <p className="font-label text-[10px] tracking-widest text-primary flex-shrink-0 ml-4">
                {formatDate(sub.subscribed_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
