import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "./AdminSidebar";
import FiltersPanel from "./FiltersPanel";
import HospitalsTableCard from "./HospitalsTableCard";
import StatCard from "./StatCard";
import TopHeader from "./TopHeader";
import {
  SIDEBAR_LINKS,
  USER_PROFILE,
} from "./hospitalsData";
import api from "../../../utils/axios";
import { ApiConst } from "../../../utils/APIConst";
import "./Hospitals.css";

function resolveStatus(capacity, availability) {
  if (!Number.isFinite(capacity) || capacity <= 0) return "capacity";
  if (!Number.isFinite(availability) || availability <= 0) return "capacity";

  const ratio = availability / capacity;
  if (ratio <= 0.4) return "maintenance";
  return "active";
}

function mapServiceToHospital(service) {
  const capacity = Number(service?.capacity) || 0;
  const availability = Number(service?.availability);
  const safeAvailability = Number.isFinite(availability)
    ? Math.min(Math.max(availability, 0), capacity)
    : 0;
  const backendOccupied = Number(service?.occupied_beds);
  const occupiedBeds = Number.isFinite(backendOccupied)
    ? Math.min(Math.max(backendOccupied, 0), capacity)
    : Math.max(capacity - safeAvailability, 0);

  return {
    _id: service?._id || service?.id,
    id: service?._id || service?.id,
    name: service?.address?.building || "Unnamed Hospital",
    city: service?.address?.city || "Unknown City",
    district: service?.address?.street || "Unknown District",
    email: service?.owner_ngo?.email || "-",
    phone: service?.phone_number || "-",
    logoUrl: Array.isArray(service?.images) ? service.images[0] : "",
    status: resolveStatus(capacity, safeAvailability),
    specialties: Array.isArray(service?.facilities) ? service.facilities : [],
    availability: safeAvailability,
    occupiedBeds,
    totalBeds: capacity,
  };
}

function buildPaginationPages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, "ellipsis", totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}

function findFilterLabel(options, value) {
  return options.find((item) => item.value === value)?.label || "";
}

function normalizeFilterValue(value) {
  return String(value || "").trim().toLowerCase();
}

function toUniqueOptions(values) {
  const unique = Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean)));
  unique.sort((a, b) => a.localeCompare(b));

  return unique.map((label) => ({
    value: normalizeFilterValue(label),
    label,
  }));
}

function statusLabel(status) {
  if (status === "active") return "Available";
  if (status === "maintenance") return "Limited";
  if (status === "capacity") return "Closed";
  return status;
}

export default function Hospitals() {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 8;

  const [hospitals, setHospitals] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHospitals = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get(ApiConst.GET_ALL_SERVICES);
      const services = response?.data?.data || response?.data || [];
      const hospitalServices = services
        .filter((item) => item?.title === "hospital")
        .map(mapServiceToHospital)
        .filter((item) => Boolean(item.id));

      setHospitals(hospitalServices);
      setSelectedRows(new Set());
    } catch (error) {
      console.error("Failed to load hospitals:", error);
      setErrorMessage("Could not load hospitals from database.");
      toast.error("Could not load hospitals from database.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const filterOptions = useMemo(() => {
    const statusOptions = toUniqueOptions(hospitals.map((hospital) => statusLabel(hospital.status))).map(
      (option) => ({
        ...option,
        value: normalizeFilterValue(option.label) === "available"
          ? "active"
          : normalizeFilterValue(option.label) === "limited"
            ? "maintenance"
            : normalizeFilterValue(option.label) === "closed"
              ? "capacity"
              : option.value,
      }),
    );

    const cityOptions = toUniqueOptions(hospitals.map((hospital) => hospital.city));
    const specialtyOptions = toUniqueOptions(
      hospitals.flatMap((hospital) =>
        Array.isArray(hospital.specialties) ? hospital.specialties : [],
      ),
    );

    return {
      status: statusOptions,
      city: cityOptions,
      specialty: specialtyOptions,
    };
  }, [hospitals]);

  const filteredHospitals = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return hospitals.filter((hospital) => {
      if (statusFilter && hospital.status !== statusFilter) return false;

      if (cityFilter && normalizeFilterValue(hospital.city) !== cityFilter) return false;

      if (specialtyFilter) {
        const specialties = Array.isArray(hospital.specialties) ? hospital.specialties : [];
        const hasSpecialty = specialties.some(
          (item) => normalizeFilterValue(item) === specialtyFilter,
        );
        if (!hasSpecialty) return false;
      }

      if (!normalizedQuery) return true;

      const searchable = [hospital.name, hospital.id, hospital.city, hospital.district]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [hospitals, searchQuery, statusFilter, cityFilter, specialtyFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, cityFilter, specialtyFilter]);

  const pagination = useMemo(() => {
    const total = filteredHospitals.length;
    const totalPages = Math.max(Math.ceil(total / ITEMS_PER_PAGE), 1);
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const from = total === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
    const to = Math.min(safeCurrentPage * ITEMS_PER_PAGE, total);

    return {
      from,
      to,
      total,
      currentPage: safeCurrentPage,
      totalPages,
      pages: buildPaginationPages(safeCurrentPage, totalPages),
    };
  }, [filteredHospitals.length, currentPage]);

  const paginatedHospitals = useMemo(() => {
    const start = (pagination.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHospitals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHospitals, pagination.currentPage]);

  const activeTags = useMemo(() => {
    const tags = [];
    if (statusFilter) {
      tags.push({
        key: "status",
        label: `Status: ${findFilterLabel(filterOptions.status, statusFilter)}`,
        primary: true,
      });
    }
    if (cityFilter) {
      tags.push({
        key: "city",
        label: `City: ${findFilterLabel(filterOptions.city, cityFilter)}`,
        primary: false,
      });
    }
    if (specialtyFilter) {
      tags.push({
        key: "specialty",
        label: `Specialty: ${findFilterLabel(filterOptions.specialty, specialtyFilter)}`,
        primary: false,
      });
    }
    if (searchQuery.trim()) {
      tags.push({
        key: "search",
        label: `Search: ${searchQuery.trim()}`,
        primary: false,
      });
    }
    return tags;
  }, [statusFilter, cityFilter, specialtyFilter, searchQuery, filterOptions]);

  const selectedCount = selectedRows.size;
  const totalActive = useMemo(
    () => filteredHospitals.filter((hospital) => hospital.status === "active").length,
    [filteredHospitals],
  );
  const availableBeds = useMemo(
    () =>
      filteredHospitals.reduce(
        (total, hospital) => total + hospital.availability,
        0,
      ),
    [filteredHospitals],
  );

  const allSelected =
    paginatedHospitals.length > 0 &&
    paginatedHospitals.every((hospital) => selectedRows.has(hospital.id));

  const headerActions = useMemo(
    () => [
      {
        label: isLoading ? "Refreshing..." : "Refresh",
        variant: "secondary",
        icon: "fa-solid fa-rotate-right",
        onClick: fetchHospitals,
        disabled: isLoading,
      },
      {
        label: "Add Hospital",
        variant: "primary",
        icon: "fa-solid fa-plus",
        onClick: () => navigate("/add-hospital"),
      },
    ],
    [navigate, isLoading, fetchHospitals],
  );

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
      setSelectedRows((prev) => {
        const next = new Set(prev);
        paginatedHospitals.forEach((hospital) => next.delete(hospital.id));
        return next;
      });
      return;
    }

    setSelectedRows((prev) => {
      const next = new Set(prev);
      paginatedHospitals.forEach((hospital) => next.add(hospital.id));
      return next;
    });
  }

  function clearAllFilters() {
    setSearchQuery("");
    setStatusFilter("");
    setCityFilter("");
    setSpecialtyFilter("");
    setCurrentPage(1);
  }

  function removeTag(tagKey) {
    if (tagKey === "search") setSearchQuery("");
    if (tagKey === "status") setStatusFilter("");
    if (tagKey === "city") setCityFilter("");
    if (tagKey === "specialty") setSpecialtyFilter("");
  }

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages));
  }

  function selectPage(pageNumber) {
    if (typeof pageNumber !== "number") return;
    setCurrentPage(Math.min(Math.max(pageNumber, 1), pagination.totalPages));
  }

  return (
    <div className="hospitals-page">
      <AdminSidebar logoText="CareAdmin" navItems={SIDEBAR_LINKS} activeItem="Hospitals" user={USER_PROFILE} />

      <div className="hospitals-main-wrap">
        <TopHeader breadcrumbStart="Admin Dashboard" currentPage="Hospitals" actions={headerActions} />

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

          <FiltersPanel
            filterOptions={filterOptions}
            tags={activeTags}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusValue={statusFilter}
            onStatusChange={setStatusFilter}
            cityValue={cityFilter}
            onCityChange={setCityFilter}
            specialtyValue={specialtyFilter}
            onSpecialtyChange={setSpecialtyFilter}
            onRemoveTag={removeTag}
            onClearAll={clearAllFilters}
            onMoreFilters={() => toast("Use Status/City/Specialty filters above.")}
          />

          {errorMessage ? <p>{errorMessage}</p> : null}
          {!isLoading && filteredHospitals.length === 0 ? (
            <p>No hospitals match the current filters.</p>
          ) : null}

          <HospitalsTableCard
            selectedCount={selectedCount}
            allSelected={allSelected}
            onToggleAll={toggleAllRows}
            hospitals={paginatedHospitals}
            selectedRows={selectedRows}
            onToggleRow={toggleRowSelection}
            pagination={pagination}
            onPreviousPage={goToPreviousPage}
            onNextPage={goToNextPage}
            onSelectPage={selectPage}
          />
        </main>
      </div>
    </div>
  );
}
