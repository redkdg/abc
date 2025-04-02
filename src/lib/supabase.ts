import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Please check your environment variables.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user with a given email already exists
export async function checkIfUserExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows returned
    console.error("Error checking if user exists:", error);
  }

  return !!data;
}

// Helper function to create a new user
export async function createUser(userData: {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}) {
  // Create the user in the users table
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email: userData.email,
        name: userData.name,
        avatar:
          userData.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    throw error;
  }

  // Create auth entry with email and password
  const { error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        user_id: data.id,
      },
    },
  });

  if (authError) {
    console.error("Error creating auth entry:", authError);
    // Clean up the user if auth creation fails
    await supabase.from("users").delete().eq("id", data.id);
    throw authError;
  }

  return data;
}

// Helper function to get user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error getting user by email:", error);
    return null;
  }

  return data;
}
