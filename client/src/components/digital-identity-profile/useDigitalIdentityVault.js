// hooks/useDigitalIdentityVault.js
import { useState, useCallback, useEffect } from "react";
import {
  fetchUserDocuments,
  fetchVaultStatus,
  updateVaultStatus,
  deleteDocument,
} from "./digitalIdentityApi";

const INITIAL_DOCUMENTS = [
  {
    name: "National_ID_Passport.pdf",
    date: "Oct 13, 2023 • 2.4 MB",
    tag: "Personal ID",
    tagColor: "#4f8ef7",
    icon: "📄",
    iconBg: "#1a2a4a",
  },
  {
    name: "Vaccination_Record_AK.enc",
    date: "Oct 15, 2023 • 1.1 MB",
    tag: "Medical",
    tagColor: "#4ade80",
    icon: "🔒",
    iconBg: "#1a2a1a",
  },
  {
    name: "Marriage_Certificate.pdf",
    date: "Sep 28, 2023 • 1.2 MB",
    tag: "Family Docs",
    tagColor: "#e0a850",
    icon: "📋",
    iconBg: "#2a1a0a",
  },
];

const INITIAL_VAULT_STATUS = {
  locked: true,
  lastAccess: "Oct 20, 2024 • 2:45 PM",
  accessCount: 12,
  storageUsed: 47,
  storageTotal: 100,
};

export function useDigitalIdentityVault(userId = "1") {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [vaultStatus, setVaultStatus] = useState(INITIAL_VAULT_STATUS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch documents and vault status on mount
  useEffect(() => {
    const loadVaultData = async () => {
      try {
        setLoading(true);
        setError(null);
        const docsData = await fetchUserDocuments(userId);
        const statusData = await fetchVaultStatus(userId);
        
        if (Array.isArray(docsData)) {
          setDocuments(docsData);
        }
        if (statusData) {
          setVaultStatus(statusData);
        }
      } catch (err) {
        console.warn("Failed to fetch vault data, using default data:", err);
        // Keep using INITIAL_DOCUMENTS and INITIAL_VAULT_STATUS as fallback
      } finally {
        setLoading(false);
      }
    };

    loadVaultData();
  }, [userId]);

  /** Toggle vault locked/unlocked state */
  const handleToggleVault = async () => {
    try {
      setLoading(true);
      setError(null);

      const newStatus = {
        locked: !vaultStatus.locked,
      };

      const response = await updateVaultStatus(newStatus);
      
      if (response) {
        setVaultStatus((prev) => ({
          ...prev,
          locked: !prev.locked,
        }));
        setSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to toggle vault");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /** Delete a document */
  const handleDeleteDocument = async (docId) => {
    try {
      setLoading(true);
      setError(null);

      await deleteDocument(docId);
      
      // Remove document from list
      setDocuments((prev) =>
        prev.filter((doc) => doc.id !== docId)
      );
      
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete document");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    documents,
    vaultStatus,
    loading,
    error,
    success,
    handleToggleVault,
    handleDeleteDocument,
  };
}
