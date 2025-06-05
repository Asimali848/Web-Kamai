"use client";

import { useMemo, useState } from "react";

import Dashboard from "@/components/dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile, createdProfiles, dummyUsers } from "@/lib/constants";

type SortOption = "name-asc" | "name-desc" | "notif-asc" | "notif-desc";

// Add notifications to dummy data
const enhancedDummyUsers = dummyUsers.map((user) => ({
  ...user,
  notifications: Math.floor(Math.random() * 10),
}));

const enhancedCreatedProfiles = createdProfiles.map((profile) => ({
  ...profile,
  notifications: Math.floor(Math.random() * 10),
}));

const AdminProfile = () => {
  // State for User Profiles
  const [userSearch, setUserSearch] = useState("");
  const [userSort, setUserSort] = useState<SortOption>("name-asc");

  // State for Created Profiles
  const [createdSearch, setCreatedSearch] = useState("");
  const [createdSort, setCreatedSort] = useState<SortOption>("name-asc");

  const sortUsers = (
    users: UserProfile[],
    search: string,
    sort: SortOption
  ) => {
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "notif-asc":
        filtered.sort((a, b) => a.notifications - b.notifications);
        break;
      case "notif-desc":
        filtered.sort((a, b) => b.notifications - a.notifications);
        break;
    }

    return filtered;
  };

  const filteredUsers = useMemo(
    () => sortUsers(enhancedDummyUsers, userSearch, userSort),
    [userSearch, userSort]
  );

  const filteredCreated = useMemo(
    () => sortUsers(enhancedCreatedProfiles, createdSearch, createdSort),
    [createdSearch, createdSort]
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">User Profiles</TabsTrigger>
          <TabsTrigger value="created">Creater Profiles</TabsTrigger>
        </TabsList>

        {/* User Profiles */}
        <TabsContent value="users">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search users by name..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full sm:w-1/2"
            />
            <Select
              onValueChange={(v: SortOption) => setUserSort(v)}
              value={userSort}
            >
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A → Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z → A)</SelectItem>
                <SelectItem value="notif-asc">
                  Notifications (Low → High)
                </SelectItem>
                <SelectItem value="notif-desc">
                  Notifications (High → Low)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardHeader className="relative flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.imageUrl || ""} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle>{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge className="absolute left-2 top-2 w-fit">
                        Notifications: {user.notifications}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </div>
        </TabsContent>

        {/* Created Profiles */}
        <TabsContent value="created">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search created profiles..."
              value={createdSearch}
              onChange={(e) => setCreatedSearch(e.target.value)}
              className="w-full sm:w-1/2"
            />
            <Select
              onValueChange={(v: SortOption) => setCreatedSort(v)}
              value={createdSort}
            >
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A → Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z → A)</SelectItem>
                <SelectItem value="notif-asc">
                  Notifications (Low → High)
                </SelectItem>
                <SelectItem value="notif-desc">
                  Notifications (High → Low)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCreated.length > 0 ? (
              filteredCreated.map((profile) => (
                <Card key={profile.id}>
                  <CardHeader className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={profile.imageUrl || ""} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle>{profile.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {profile.email}
                      </p>
                      <Badge className="mt-1 flex w-fit items-center justify-center">
                        Notifications: {profile.notifications}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                No created profiles found.
              </p>
            )}
          </div>
        </TabsContent>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfile;
