"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setContacts(data);
        setLoading(false);
      });
  }, [router]);

  async function markRead(id: string) {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
  }

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
          Inbox
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Messages
        </h1>
      </div>

      {loading ? (
        <p className="font-body text-sm text-on-surface-variant">Loading...</p>
      ) : contacts.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low">
          <p className="font-headline text-xl italic text-on-surface-variant">
            No messages yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-outline-variant/20">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => {
                setExpanded(expanded === contact.id ? null : contact.id);
                if (!contact.read) markRead(contact.id);
              }}
              className={`w-full text-left p-6 transition-colors ${
                expanded === contact.id
                  ? "bg-surface-container-low"
                  : "bg-surface hover:bg-surface-container-low"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {!contact.read && (
                    <span className="w-2 h-2 bg-primary flex-shrink-0" />
                  )}
                  <p
                    className={`font-body text-sm truncate ${
                      contact.read ? "font-light" : "font-medium"
                    }`}
                  >
                    {contact.name}
                  </p>
                </div>
                <p className="font-body text-xs text-on-surface-variant truncate md:w-48">
                  {contact.email}
                </p>
                <p className="font-label text-[10px] tracking-widest text-primary md:w-24 flex-shrink-0">
                  {formatDate(contact.created_at)}
                </p>
              </div>
              {expanded === contact.id && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20">
                  <p className="font-body text-sm font-light leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>
                  {contact.phone && (
                    <p className="font-body text-xs text-on-surface-variant mt-3">
                      Phone: {contact.phone}
                    </p>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
