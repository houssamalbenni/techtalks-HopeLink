import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from "../../../utils/axios";
import { ApiConst } from "../../../utils/APIConst";
import toast from "react-hot-toast";
import "./donate.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalDonations: 0,
    totalDonors: 0,
    donors: [],
    monthlyBreakdown: [],
  });
  const [myDonations, setMyDonations] = useState([]);

  const fetchDonationData = async () => {
    setStatsLoading(true);
    try {
      const [summaryRes, myDonationsRes] = await Promise.all([
        api.get(ApiConst.GET_DONATION_SUMMARY),
        api.get(ApiConst.DONATE),
      ]);

      setSummary(summaryRes?.data?.summary || {});
      setMyDonations(myDonationsRes?.data?.donations || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load donation stats right now.");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
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
      setAmount(50);
      setName("");
      setCard("");
      setExpiry("");
      setCvv("");
      fetchDonationData();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Donation failed.");
    } finally {
      setLoading(false);
    }
  };

  const chartData =
    summary?.monthlyBreakdown?.length > 0
      ? summary.monthlyBreakdown
      : [{ label: "No data", totalAmount: 0 }];

  return (
    <div className="donor-dashboard">
      <section className="donor-hero-card">
        <div>
          <span className="donor-eyebrow">Donor command center</span>
          <h1>Donation Overview</h1>
          <p>
            Track live giving activity, see the total raised, and follow how
            many people have contributed so far.
          </p>
        </div>
        <button
          type="button"
          className="donor-refresh-button"
          onClick={fetchDonationData}
          disabled={statsLoading}
        >
          {statsLoading ? "Refreshing..." : "Refresh stats"}
        </button>
      </section>

      <section className="donor-stats-grid">
        <article className="donor-stat-card">
          <span className="donor-stat-label">Total donors</span>
          <strong className="donor-stat-value">
            {statsLoading ? "..." : summary.totalDonors || 0}
          </strong>
          <span className="donor-stat-footnote">people contributed so far</span>
        </article>

        <article className="donor-stat-card">
          <span className="donor-stat-label">Total raised</span>
          <strong className="donor-stat-value">
            {statsLoading ? "..." : formatCurrency(summary.totalAmount)}
          </strong>
          <span className="donor-stat-footnote">across all recorded donations</span>
        </article>

        <article className="donor-stat-card">
          <span className="donor-stat-label">Donation entries</span>
          <strong className="donor-stat-value">
            {statsLoading ? "..." : summary.totalDonations || 0}
          </strong>
          <span className="donor-stat-footnote">successful transactions logged</span>
        </article>
      </section>

      <section className="donor-main-grid">
        <article className="donor-panel donor-form-panel">
          <div className="donor-panel-heading">
            <div>
              <h2>Make a Donation</h2>
              <p>Enter the donation amount and payment details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="donor-form">
            <label className="donor-field">
              <span>Amount (USD)</span>
              <input
                type="number"
                value={amount}
                min={1}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>

            <label className="donor-field">
              <span>Name on card</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
              />
            </label>

            <label className="donor-field">
              <span>Card number</span>
              <input
                type="text"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
            </label>

            <div className="donor-field-row">
              <label className="donor-field">
                <span>Expiry</span>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
              </label>

              <label className="donor-field donor-field-cvv">
                <span>CVV</span>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </label>
            </div>

            <button type="submit" disabled={loading} className="donor-submit-button">
              {loading ? "Processing..." : `Donate ${formatCurrency(amount)}`}
            </button>
          </form>
        </article>

        <article className="donor-panel donor-chart-panel">
          <div className="donor-panel-heading">
            <div>
              <h2>Donation trend</h2>
              <p>Total donated amounts grouped by recorded month.</p>
            </div>
          </div>

          <div className="donor-chart-shell">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="donationFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5ca2ff" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#5ca2ff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#253357" vertical={false} />
                <XAxis dataKey="label" stroke="#7f93c9" tickLine={false} axisLine={false} />
                <YAxis stroke="#7f93c9" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #30416a",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  formatter={(value) => [formatCurrency(value), "Raised"]}
                />
                <Area
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#6aa8ff"
                  strokeWidth={3}
                  fill="url(#donationFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="donor-bottom-grid">
        <article className="donor-panel donor-table-panel">
          <div className="donor-panel-heading">
            <div>
              <h2>Top contributors</h2>
              <p>Every donor name with the total amount they have contributed.</p>
            </div>
          </div>

          <div className="donor-table">
            <div className="donor-table-head">
              <span>Donor</span>
              <span>Donations</span>
              <span>Total</span>
            </div>

            {statsLoading ? (
              <div className="donor-empty-state">Loading donor summary...</div>
            ) : summary?.donors?.length ? (
              summary.donors.map((donor) => (
                <div className="donor-table-row" key={donor._id}>
                  <span>{donor.full_name}</span>
                  <span>{donor.donationCount}</span>
                  <strong>{formatCurrency(donor.donatedAmount)}</strong>
                </div>
              ))
            ) : (
              <div className="donor-empty-state">No donations recorded yet.</div>
            )}
          </div>
        </article>

        <article className="donor-panel donor-personal-panel">
          <div className="donor-panel-heading">
            <div>
              <h2>My donations</h2>
              <p>Your latest recorded donation entries.</p>
            </div>
          </div>

          <div className="donor-personal-list">
            {statsLoading ? (
              <div className="donor-empty-state">Loading your donation history...</div>
            ) : myDonations.length ? (
              myDonations
                .slice()
                .reverse()
                .slice(0, 6)
                .map((donation) => (
                  <div className="donor-personal-item" key={donation._id}>
                    <div>
                      <strong>{formatCurrency(donation.amount)}</strong>
                      <span>
                        {new Date(donation.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                    <small>Recorded</small>
                  </div>
                ))
            ) : (
              <div className="donor-empty-state">You have not donated yet.</div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
