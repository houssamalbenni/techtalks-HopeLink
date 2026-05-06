export const safeApiCall = async (apiCall) => {
  try {
    const { data } = await apiCall;
    return data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.message ||
      err?.message ||
      "Something went wrong";
    console.error(msg);
    throw new Error(msg);
  }
};

export const formatNotificationTime = (createdAt) => {
  const now = new Date();
  const date = new Date(createdAt);

  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) return "just now";

  if (diffMin < 60) return `${diffMin}m ago`;

  if (diffHour < 24 && now.getDate() === date.getDate()) {
    return `${diffHour}h ago`;
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `yesterday ${formatTime(date)}`;
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${formatTime(date)}`;
};

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getStatusClass = (type) => {
  if (type === "emergency_alert") return "border-red";
  if (type === "medicine_update") return "border-yellow";
  if (type === "shelter_update") return "border-teal";
  if (type === "ngo_announcement" || type === "system") return "border-blue";
  if (type === "aid_request_update") return "border-purple";
  return "border-gray";
};

export const getTagClass = (type) => {
  if (type === "emergency_alert") return "tag-red";
  if (type === "medicine_update") return "tag-yellow";
  if (type === "shelter_update" || type === "food_update") return "tag-teal";
  if (type === "aid_request_update") return "tag-purple";
  if (type === "system") return "tag-blue";
  return "tag-teal";
};

export const getImageSrc = (type) => {
  if (type === "emergency_alert") return "../../assets/critical.png";
  if (type === "shelter_update") return "../../assets/shelters.png";
  if (type === "medicine_update") return "../../assets/hospital.png";
  if (type === "system") return "../../assets/system.png";
  if (type === "aid_request_update") return "../../assets/request.png";
  return "../../assets/shelters.png";
};
