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
