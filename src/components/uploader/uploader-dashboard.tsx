import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "../ui/input";

type User = {
  id: number;
  title: string;
  description: string;
  donebyuser: number;
  active: boolean;
};

// Dummy data
const initialUsers: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  title: `User ${i + 1}`,
  description: "test@test.com",
  donebyuser: i + 1,
  active: i % 4 !== 3,
}));

type SortOption =
  | "name-asc"
  | "name-desc"
  | "donebyuser-asc"
  | "donebyuser-desc";

const sortUsers = (
  users: User[],
  sort: SortOption,
  userSearch: string
): User[] => {
  let filtered = users.filter((user) =>
    user.title.toLowerCase().includes(userSearch.toLowerCase())
  );

  switch (sort) {
    case "name-asc":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "donebyuser-asc":
      filtered.sort((a, b) => a.donebyuser - b.donebyuser);
      break;
    case "donebyuser-desc":
      filtered.sort((a, b) => b.donebyuser - a.donebyuser);
      break;
  }

  return filtered;
};

const UploaderDashboard = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userSearch, setUserSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredUsers = useMemo(
    () => sortUsers(users, sort, userSearch),
    [sort, userSearch, users]
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const toggleActive = (id: number, checked: boolean) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: checked } : user))
    );
  };

  return (
    <div className="h-screen w-full">
      <Card>
        <CardContent className="p-4">
          <h2 className="mb-2 text-2xl font-semibold">Base CRUD</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            A basic CRUD UI that is most often used in projects.
          </p>

          {/* Header controls */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSort("name-asc")}>
                    Name A-Z ↓
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("name-desc")}>
                    Name Z-A ↑
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("donebyuser-asc")}>
                    Done-by-User 0-9 ↑
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("donebyuser-desc")}>
                    Done-by-User 9-0 ↓
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Input
              placeholder="Search users by name..."
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-1/2"
            />
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Done-by-User</TableHead>
                  <TableHead className="hidden sm:table-cell">Active</TableHead>
                  <TableHead className="mx-auto flex w-full items-center justify-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.title}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.description}
                    </TableCell>
                    <TableCell>{user.donebyuser}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Switch
                        checked={user.active}
                        onCheckedChange={(checked) =>
                          toggleActive(user.id, checked)
                        }
                        className=""
                      />
                    </TableCell>
                    <TableCell className="mx-auto flex w-full items-center justify-center">
                      {/* <Pencil className="h-4 w-4 cursor-pointer" /> */}
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-sm text-muted-foreground sm:text-left">
              Showing {(currentPage - 1) * rowsPerPage + 1}–
              {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    className={
                      currentPage === page ? "bg-primary text-white" : ""
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded border px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploaderDashboard;
