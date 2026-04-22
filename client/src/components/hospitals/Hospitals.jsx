import { useMemo, useState } from "react";

import AdminSidebar from "./AdminSidebar";
import FiltersPanel from "./FiltersPanel";
import HospitalsTableCard from "./HospitalsTableCard";
import StatCard from "./StatCard";
import TopHeader from "./TopHeader";
import {
  ACTIVE_TAGS,
  FILTER_OPTIONS,
  HOSPITALS,
  PAGINATION_CONFIG,
  SIDEBAR_LINKS,
  USER_PROFILE,
} from "./hospitalsData";
import "./Hospitals.css";

export default function Hospitals() {
  const [selectedRows, setSelectedRows] = useState(new Set(["HSP-4095", "HSP-4092"]));

  const selectedCount = selectedRows.size;
  const totalActive = useMemo(
    () => HOSPITALS.filter((hospital) => hospital.status === "active").length,
    [],
  );
  const availableBeds = useMemo(
    () => HOSPITALS.reduce((total, hospital) => total + (hospital.totalBeds - hospital.occupiedBeds), 0),
    [],
  );

  const allSelected = selectedRows.size === HOSPITALS.length;

  function toggleRowSelection(id) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllRows() {
    if (allSelected) {
      setSelectedRows(new Set());
      return;
    }

    setSelectedRows(new Set(HOSPITALS.map((hospital) => hospital.id)));
  }

  return (
    <div className="hospitals-page">
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Hospitals" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbStart="Admin Dashboard" currentPage="Hospitals" actionLabel="Add Hospital" />

        <main className="hospitals-content">
          <section className="hospitals-heading-row">
            <div>
              <h1>Hospitals Directory</h1>
              <p>Manage and monitor all registered hospital facilities.</p>
            </div>

            <div className="hospitals-stats">
              <StatCard label="Total Active" value={totalActive} />
              <StatCard label="Available Beds" value={availableBeds.toLocaleString()} highlighted />
            </div>
          </section>

          <FiltersPanel filterOptions={FILTER_OPTIONS} tags={ACTIVE_TAGS} />

          <HospitalsTableCard
            selectedCount={selectedCount}
            allSelected={allSelected}
            onToggleAll={toggleAllRows}
            hospitals={HOSPITALS}
            selectedRows={selectedRows}
            onToggleRow={toggleRowSelection}
            pagination={PAGINATION_CONFIG}
          />
        </main>
      </div>
    </div>
  );
}
