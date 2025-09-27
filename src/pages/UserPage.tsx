import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  email: string;
  name?: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
   
    const { data, error } = await supabase.from("users" as any).select("*");
    if (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
      return;
    }
    setUsers(Array.isArray(data)
      ? ((data as unknown) as User[]).filter((u): u is User => typeof u.id === "string" && typeof u.email === "string")
      : []
    );
    setLoading(false);
  };

  // Add a new user
  const addUser = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }
    const { data, error } = await supabase
      .from<any, any>("users")
      .insert([{ email, name }]);
    if (error) {
      console.error("Insert error:", error);
      alert("Error adding user");
      return;
    }
    setUsers(prev => [...prev, ...(data || [])]);
    setEmail("");
    setName("");
  };

  useEffect(() => {
    fetchUsers();

    // Realtime subscription using supabase.channel
    const channel = supabase
      .channel('users_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'users' },
        (payload: any) => {
          setUsers(prev => [...prev, payload.new as User]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={addUser} className="bg-blue-500 text-white p-2 rounded">Add User</button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
