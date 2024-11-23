"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import apiCall from "@/helper/apiCall";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};
export default function Home() {
  const [user, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<User>({
    id: 0,
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const getUserData = async () => {
    try {
      const allUser = await apiCall.get("");

      setUser(allUser.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Error fetching data");
    }
  };

  const registerUser = async () => {
    try {
      const { data } = await apiCall.post("", {
        id: 722822,
        name: form.name,
        gender: form.gender,
        status: form.status,
        email: form.email,
      });

      setForm({ id: 0, name: "", email: "", gender: "", status: "" });
    } catch (error) {
      console.log(error);
      setError("Error submit data");
    }
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <main className="p-10 w-full flex flex-col gap-10">
      <div className="w-1/2 flex flex-col gap-5">
        <Input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
        />

        <Input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
        />
        <Input
          placeholder="Gender"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          value={form.gender}
        />
        <Input
          placeholder="Status"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          value={form.status}
        />
        <Button
          onClick={() => registerUser()}
          disabled={
            form.name === "" ||
            form.status === "" ||
            form.email === "" ||
            form.gender === "" ||
            form.status === ""
          }
        >
          Add
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((e, i) => (
            <TableRow key={i}>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.gender}</TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xl">{error}</p>
    </main>
  );
}
