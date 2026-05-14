import { useState } from "react";
import api from "../../utils/axios";
import { ApiConst } from "../../utils/APIConst";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      // send donation to existing backend endpoint. Backend expected to handle payment or record donation.
      const payload = {
        amount: Number(amount),
        donorName: name,
        payment: {
          cardNumber: card.slice(-4).padStart(card.length, "*") || null,
          expiry,
          cvv: cvv ? "***" : null,
        },
      };

      const res = await api.post(ApiConst.DONATE, payload);
      toast.success(res?.data?.message || "Donation successful. Thank you!");
      // navigate to donor dashboard or home
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Donation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Make a Donation</h2>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        Enter donation amount and payment details. This uses the existing backend
        donation endpoint—no backend changes.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Amount (USD)
          <input
            type="number"
            value={amount}
            min={1}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Name on card
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label>
          Card number
          <input
            type="text"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="4242 4242 4242 4242"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <label style={{ flex: 1 }}>
            Expiry
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
          <label style={{ width: 120 }}>
            CVV
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 16px", background: "#4f8ef7", color: "white", border: "none", borderRadius: 8 }}
          >
            {loading ? "Processing..." : `Donate $${amount}`}
          </button>
          <button type="button" onClick={() => navigate(-1)} style={{ padding: "10px 16px", borderRadius: 8 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
