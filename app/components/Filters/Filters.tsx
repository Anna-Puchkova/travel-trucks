"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./Filters.module.css";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [camperForm, setCamperForm] = useState(searchParams.get("form") || "");
  const [engine, setEngine] = useState(searchParams.get("engine") || "");
  const [transmission, setTransmission] = useState(
    searchParams.get("transmission") || "",
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (camperForm) {
      params.set("form", camperForm);
    }

    if (engine) {
      params.set("engine", engine);
    }

    if (transmission) {
      params.set("transmission", transmission);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleClear = () => {
    setLocation("");
    setCamperForm("");
    setEngine("");
    setTransmission("");

    router.push(pathname);
  };

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSearch}>
        {/* Location */}
        <div className={styles.group}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>

          <div className={styles.inputWrapper}>
            <svg className={styles.locationIcon}>
              <use href="/symbol.svg#icon-Map" />
            </svg>

            <input
              id="location"
              type="text"
              className={styles.inputLocation}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City"
            />
          </div>
        </div>

        <h3 className={styles.title}>Filters</h3>

        {/* Camper form */}
        <div className={styles.group}>
          <span className={styles.subTitle}>Camper form</span>

          <div className={styles.radioList}>
            {[
              { id: "alcove", label: "Alcove" },
              { id: "panel_van", label: "Panel Van" },
              { id: "integrated", label: "Integrated" },
              {
                id: "semi_integrated",
                label: "Semi Integrated",
              },
            ].map((item) => (
              <label key={item.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="camperForm"
                  value={item.id}
                  checked={camperForm === item.id}
                  onChange={(e) => setCamperForm(e.target.value)}
                  className={styles.radioInput}
                />

                <span className={styles.radioCustom} />
                <span className={styles.radioText}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div className={styles.group}>
          <span className={styles.subTitle}>Engine</span>

          <div className={styles.radioList}>
            {[
              { id: "diesel", label: "Diesel" },
              { id: "petrol", label: "Petrol" },
              { id: "hybrid", label: "Hybrid" },
              { id: "electric", label: "Electric" },
            ].map((item) => (
              <label key={item.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="engine"
                  value={item.id}
                  checked={engine === item.id}
                  onChange={(e) => setEngine(e.target.value)}
                  className={styles.radioInput}
                />

                <span className={styles.radioCustom} />
                <span className={styles.radioText}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className={styles.group}>
          <span className={styles.subTitle}>Transmission</span>

          <div className={styles.radioList}>
            {[
              { id: "automatic", label: "Automatic" },
              { id: "manual", label: "Manual" },
            ].map((item) => (
              <label key={item.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="transmission"
                  value={item.id}
                  checked={transmission === item.id}
                  onChange={(e) => setTransmission(e.target.value)}
                  className={styles.radioInput}
                />

                <span className={styles.radioCustom} />
                <span className={styles.radioText}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.btnSearch}>
            Search
          </button>

          <button
            type="button"
            className={styles.btnClear}
            onClick={handleClear}
          >
            ✕ Clear filters
          </button>
        </div>
      </form>
    </aside>
  );
}
