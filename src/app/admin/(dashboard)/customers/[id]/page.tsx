"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  notes: string;
  created_at: string;
}

interface Booking {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  services: { name: string } | null;
}

interface SoapPhoto {
  id: string;
  label: string;
  storage_path: string;
  url?: string;
}

interface SoapNote {
  id: string;
  booking_id: string | null;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  products_used: string;
  contraindications: string;
  created_at: string;
  photos?: SoapPhoto[];
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [soapNotes, setSoapNotes] = useState<SoapNote[]>([]);
  const [tab, setTab] = useState<"history" | "notes">("notes");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    booking_id: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    products_used: "",
    contraindications: "",
  });

  useEffect(() => {
    fetch(`/api/admin/customers/${id}`)
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) {
          setCustomer(data.customer);
          setBookings(data.bookings);
          setSoapNotes(data.soapNotes);
        }
      });
  }, [id, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/admin/customers/${id}/soap-notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const note = await res.json();
      setSoapNotes((prev) => [note, ...prev]);
      setForm({
        booking_id: "",
        subjective: "",
        objective: "",
        assessment: "",
        plan: "",
        products_used: "",
        contraindications: "",
      });
      setShowForm(false);
    }
    setSaving(false);
  }

  async function handlePhotoUpload(
    noteId: string,
    label: "before" | "after",
    files: FileList | null
  ) {
    if (!files || files.length === 0) return;
    setUploadingPhotos((prev) => ({ ...prev, [`${noteId}-${label}`]: true }));

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("soap_note_id", noteId);
      formData.append("customer_id", id);
      formData.append("label", label);

      const res = await fetch("/api/admin/soap-photos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const photo = await res.json();
        setSoapNotes((prev) =>
          prev.map((n) =>
            n.id === noteId
              ? { ...n, photos: [...(n.photos ?? []), photo] }
              : n
          )
        );
      }
    }
    setUploadingPhotos((prev) => ({ ...prev, [`${noteId}-${label}`]: false }));
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatDateTime(dateStr: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })} at ${d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  if (!customer) {
    return (
      <p className="font-body text-sm text-on-surface-variant">Loading...</p>
    );
  }

  const statusColors: Record<string, string> = {
    confirmed: "text-secondary",
    completed: "text-on-surface",
    cancelled: "text-error",
    no_show: "text-error",
  };

  return (
    <div>
      {/* Back + Header */}
      <Link
        href="/admin/customers"
        className="font-label text-[10px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors inline-flex items-center gap-2 mb-6"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Customers
      </Link>

      <div className="mb-10">
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          {customer.first_name} {customer.last_name}
        </h1>
        <div className="flex flex-wrap gap-6 mt-4">
          <p className="font-body text-sm text-on-surface-variant">
            {customer.email}
          </p>
          {customer.phone && (
            <p className="font-body text-sm text-on-surface-variant">
              {customer.phone}
            </p>
          )}
          <p className="font-label text-[10px] uppercase tracking-widest text-primary self-center">
            Client since {formatDate(customer.created_at)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab("notes")}
          className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-colors ${
            tab === "notes"
              ? "bg-on-surface text-surface"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          SOAP Notes ({soapNotes.length})
        </button>
        <button
          onClick={() => setTab("history")}
          className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-colors ${
            tab === "history"
              ? "bg-on-surface text-surface"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          Visit History ({bookings.length})
        </button>
      </div>

      {/* SOAP Notes Tab */}
      {tab === "notes" && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-8 bg-on-surface text-surface px-6 py-3 font-label text-[10px] uppercase tracking-widest hover:bg-primary transition-colors"
          >
            {showForm ? "Cancel" : "New SOAP Note"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSave}
              className="mb-10 bg-surface-container-low p-6 md:p-8 space-y-6"
            >
              {bookings.length > 0 && (
                <div>
                  <label className="font-label text-[10px] uppercase tracking-widest text-primary block mb-2">
                    Link to Appointment (optional)
                  </label>
                  <select
                    value={form.booking_id}
                    onChange={(e) =>
                      setForm({ ...form, booking_id: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-outline py-2 font-body text-sm font-light focus:outline-none focus:border-on-surface"
                  >
                    <option value="">None</option>
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {formatDateTime(b.starts_at)} —{" "}
                        {b.services?.name ?? "Service"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {[
                {
                  key: "subjective",
                  label: "Subjective",
                  hint: "Client's reported concerns, feelings, goals",
                },
                {
                  key: "objective",
                  label: "Objective",
                  hint: "Your observations: skin condition, type, findings",
                },
                {
                  key: "assessment",
                  label: "Assessment",
                  hint: "Skin analysis, what the skin needs",
                },
                {
                  key: "plan",
                  label: "Plan",
                  hint: "Treatment performed, home-care, next steps",
                },
                {
                  key: "products_used",
                  label: "Products Used",
                  hint: "Products applied during treatment",
                },
                {
                  key: "contraindications",
                  label: "Contraindications",
                  hint: "Allergies, sensitivities, things to avoid",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="font-label text-[10px] uppercase tracking-widest text-primary block mb-1">
                    {field.label}
                  </label>
                  <p className="font-body text-[10px] text-on-surface-variant mb-2">
                    {field.hint}
                  </p>
                  <textarea
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-transparent border-b border-outline py-2 font-body text-sm font-light focus:outline-none focus:border-on-surface transition-colors resize-none"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={saving}
                className="bg-on-surface text-surface px-8 py-3 font-label text-[10px] uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Note"}
              </button>
            </form>
          )}

          {soapNotes.length === 0 && !showForm ? (
            <div className="py-16 text-center bg-surface-container-low">
              <p className="font-headline text-xl italic text-on-surface-variant">
                No SOAP notes yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {soapNotes.map((note) => {
                const beforePhotos = (note.photos ?? []).filter((p) => p.label === "before");
                const afterPhotos = (note.photos ?? []).filter((p) => p.label === "after");

                return (
                  <div key={note.id} className="bg-surface-container-low p-6 md:p-8">
                    <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-4">
                      {formatDate(note.created_at)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {note.subjective && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Subjective
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.subjective}
                          </p>
                        </div>
                      )}
                      {note.objective && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Objective
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.objective}
                          </p>
                        </div>
                      )}
                      {note.assessment && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Assessment
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.assessment}
                          </p>
                        </div>
                      )}
                      {note.plan && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Plan
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.plan}
                          </p>
                        </div>
                      )}
                      {note.products_used && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Products Used
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.products_used}
                          </p>
                        </div>
                      )}
                      {note.contraindications && (
                        <div>
                          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                            Contraindications
                          </p>
                          <p className="font-body text-sm font-light">
                            {note.contraindications}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Photos Section */}
                    <div className="mt-6 pt-6 border-t border-outline-variant/30">
                      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">
                        Photos
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Before */}
                        <div>
                          <p className="font-label text-[9px] uppercase tracking-widest text-primary mb-2">
                            Before
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {beforePhotos.map((p) => (
                              <a
                                key={p.id}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-20 h-20 bg-surface-container overflow-hidden"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.url}
                                  alt="Before"
                                  className="w-full h-full object-cover"
                                />
                              </a>
                            ))}
                          </div>
                          <label className="inline-flex items-center gap-2 px-3 py-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 cursor-pointer transition-colors">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span className="font-label text-[9px] uppercase tracking-widest">
                              {uploadingPhotos[`${note.id}-before`]
                                ? "Uploading..."
                                : "Add"}
                            </span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoUpload(note.id, "before", e.target.files)
                              }
                            />
                          </label>
                        </div>

                        {/* After */}
                        <div>
                          <p className="font-label text-[9px] uppercase tracking-widest text-primary mb-2">
                            After
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {afterPhotos.map((p) => (
                              <a
                                key={p.id}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-20 h-20 bg-surface-container overflow-hidden"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.url}
                                  alt="After"
                                  className="w-full h-full object-cover"
                                />
                              </a>
                            ))}
                          </div>
                          <label className="inline-flex items-center gap-2 px-3 py-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 cursor-pointer transition-colors">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span className="font-label text-[9px] uppercase tracking-widest">
                              {uploadingPhotos[`${note.id}-after`]
                                ? "Uploading..."
                                : "Add"}
                            </span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoUpload(note.id, "after", e.target.files)
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Visit History Tab */}
      {tab === "history" && (
        <div>
          {bookings.length === 0 ? (
            <div className="py-16 text-center bg-surface-container-low">
              <p className="font-headline text-xl italic text-on-surface-variant">
                No visit history
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-px bg-outline-variant/20">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-surface p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-8"
                >
                  <div className="md:w-48 flex-shrink-0">
                    <p className="font-body text-sm font-medium">
                      {formatDateTime(booking.starts_at)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-on-surface-variant">
                      {booking.services?.name ?? "—"}
                    </p>
                  </div>
                  <span
                    className={`font-label text-[10px] uppercase tracking-widest ${
                      statusColors[booking.status] ?? ""
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
