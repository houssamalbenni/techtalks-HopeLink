import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAllMissingPersons } from "../services/MissingPerson";

const FamilyReunificationContext = createContext(null);

export const FamilyReunificationProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState();
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCases = useCallback(async (options = {}) => {
    const { showLoading = true } = options;
    try {
      if (showLoading) {
        setLoading(true);
      }
      const res = await getAllMissingPersons();
      if (res) {
        setCases(res.data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    const foundCase = cases.find((c) => c._id === selectedId);
    setSelectedCase(foundCase);
  }, [cases, selectedId]);

  const handleCaseUpdated = useCallback((updatedCase) => {
    if (!updatedCase?._id) {
      return;
    }

    setCases((current) =>
      current.map((item) =>
        item._id === updatedCase._id ? updatedCase : item,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      selectedId,
      setSelectedId,
      cases,
      setCases,
      selectedCase,
      loading,
      handleCaseUpdated,
      fetchCases,
    }),
    [selectedId, cases, selectedCase, loading, fetchCases, handleCaseUpdated],
  );

  return (
    <FamilyReunificationContext.Provider value={value}>
      {children}
    </FamilyReunificationContext.Provider>
  );
};

export const useFamilyReunification = () => {
  const context = useContext(FamilyReunificationContext);
  if (!context) {
    throw new Error(
      "useFamilyReunification must be used within FamilyReunificationProvider",
    );
  }

  return context;
};
