import { createClient } from "@supabase/supabase-js";
const supabaseBucket = import.meta.env.VITE_SUPABASE_BUCKET || "public-images";
let cachedClient = null;

export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  supabaseUrl = supabaseUrl.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(supabaseUrl)) {
    supabaseUrl = `https://${supabaseUrl}`;
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  return cachedClient;
}

export const uploadLogo = async (file) => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    toast.error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
    return "";
  }

  const ownerNgoId = "public";
  const extension = file.name.split(".").pop() || "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const filePath = `hospitals/${ownerNgoId}/${fileName}`;

  const { error } = await supabase.storage
    .from(supabaseBucket)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(supabaseBucket).getPublicUrl(filePath);
  return data?.publicUrl || "";
};
