import { useState, useMemo, useEffect } from "react";
import "./ShelterOverview.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TabBar from "./TabBar";
import SearchToolbar from "./SearchToolbar";
import ShelterTable from "./ShelterTable";
import Pagination from "./Pagination";
import { SHELTERS, TABS, NAV_ITEMS } from "./data";
import {
  fetchShelters,
  updateShelterStatus,
  deleteShelterApi,
} from "./shelterOverviewApi";

export default function ShelterOverview() {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNav, setActiveNav] = useState("Shelters");
  const rowsPerPage = 4;

  // Fetch shelters from backend on component mount
  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchShelters();
      setShelters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to fetch from backend, using fallback data:", err);
      // Fallback to static data if backend fails
      setShelters(SHELTERS);
    } finally {
      setLoading(false);
    }
  };

  /* Filter */
  const filtered = useMemo(
    () =>
      shelters.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.city.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, shelters],
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const allChecked =
    paginated.length > 0 && paginated.every((s) => selected.has(s.id));

  /* Select */
  const toggleAll = () => {
    if (allChecked) {
      const next = new Set(selected);
      paginated.forEach((s) => next.delete(s.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      paginated.forEach((s) => next.add(s.id));
      setSelected(next);
    }
  };

  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  /* Bulk actions */
  const bulkActivate = async () => {
    try {
      for (const id of selected) {
        await updateShelterStatus(id, "active");
      }
      setSelected(new Set());
      await loadShelters();
    } catch (err) {
      setError("Failed to activate shelters");
      console.error(err);
    }
  };

  const bulkDeactivate = async () => {
    try {
      for (const id of selected) {
        await updateShelterStatus(id, "inactive");
      }
      setSelected(new Set());
      await loadShelters();
    } catch (err) {
      setError("Failed to deactivate shelters");
      console.error(err);
    }
  };

  const bulkDelete = async () => {
    try {
      for (const id of selected) {
        await deleteShelterApi(id);
      }
      setSelected(new Set());
      await loadShelters();
    } catch (err) {
      setError("Failed to delete shelters");
      console.error(err);
    }
  };

  /* Handlers */
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        navItems={NAV_ITEMS}
      />

      {/* ── Main ── */}
      <div className="main">
        {/* Topbar */}
        <Topbar />

        {/* Body */}
        <div className="page-body">
          {/* Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Shelters Management</h1>
              <p className="page-subtitle">
                Manage and monitor all registered shelter facilities
              </p>
            </div>
            <button className="btn-add">
              <span>＋</span> Add Shelter
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px",
                marginBottom: "16px",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                color: "#c33",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              Loading shelters...
            </div>
          ) : (
            <div className="card">
              {/* Tab bar */}
              <TabBar
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Toolbar */}
              <SearchToolbar
                search={search}
                onSearchChange={handleSearchChange}
                selected={selected}
                onBulkActivate={bulkActivate}
                onBulkDeactivate={bulkDeactivate}
                onBulkDelete={bulkDelete}
              />

              {/* Table */}
              <ShelterTable
                paginated={paginated}
                selected={selected}
                onToggleAll={toggleAll}
                onToggleRow={toggleRow}
                allChecked={allChecked}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                filteredLength={filtered.length}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
