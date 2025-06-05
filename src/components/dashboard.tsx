// import { useMemo, useState } from "react";
// import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "./ui/input";
// // ✅ User type definition
// type User = {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
//   address: string;
//   group: string;
//   role: string;
//   active: boolean;
//   notifications: number;
// };
// // ✅ Dummy data
// const users: User[] = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `User ${i + 1}`,
//   age: Math.floor(Math.random() * 90 + 5),
//   email: "test@test.com",
//   address: `London Park no. ${i + 1}`,
//   group: i % 3 === 0 ? "admin" : "project_manager",
//   role: i % 2 === 0 ? "accountant" : "recruiter",
//   active: i % 4 !== 3,
//   notifications: Math.floor(Math.random() * 10),
// }));
// type SortOption = "name-asc" | "name-desc" | "notif-asc" | "notif-desc";
// // ✅ Sorting + Filtering
// const sortUsers = (
//   users: User[],
//   sort: SortOption,
//   userSearch: string
// ): User[] => {
//   let filtered = users.filter((user) =>
//     user.name.toLowerCase().includes(userSearch.toLowerCase())
//   );
//   switch (sort) {
//     case "name-asc":
//       filtered.sort((a, b) => a.name.localeCompare(b.name));
//       break;
//     case "name-desc":
//       filtered.sort((a, b) => b.name.localeCompare(a.name));
//       break;
//     case "notif-asc":
//       filtered.sort((a, b) => a.notifications - b.notifications);
//       break;
//     case "notif-desc":
//       filtered.sort((a, b) => b.notifications - a.notifications);
//       break;
//   }
//   return filtered;
// };
// const Dashboard = () => {
//   const [userSearch, setUserSearch] = useState("");
//   const [sort, setSort] = useState<SortOption>("name-asc");
//   const filteredUsers = useMemo(
//     () => sortUsers(users, sort, userSearch),
//     [sort, userSearch]
//   );
//   return (
//     <div className="space-y-4 p-4 md:p-6">
//       <Card>
//         <CardContent className="py-6">
//           <h2 className="mb-2 text-2xl font-semibold">Base CRUD</h2>
//           <p className="mb-4 text-sm text-muted-foreground">
//             A basic CRUD UI that is most often used in projects.
//           </p>
//           {/* Header controls */}
//           <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
//             <div className="flex gap-2">
//               {/* Sort Dropdown */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline">Sort By</Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={() => setSort("name-asc")}>
//                     Name A-Z ↓
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSort("name-desc")}>
//                     Name Z-A ↑
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSort("notif-asc")}>
//                     Notifications 0-9 ↑
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSort("notif-desc")}>
//                     Notifications 9-0 ↓
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//               {/* <Button>Create New User</Button> */}
//             </div>
//             {/* Search Input */}
//             <Input
//               placeholder="Search users by name..."
//               value={userSearch}
//               onChange={(e) => setUserSearch(e.target.value)}
//               className="w-full sm:w-1/2"
//             />
//           </div>
//           <p className="mt-4 text-sm text-muted-foreground">
//             Custom header here. 8 users, 4 golden users, 2 blocked users.
//           </p>
//           {/* Table */}
//           <div className="mt-4 overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Avatar</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Age</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Notifications</TableHead>
//                   <TableHead>Address</TableHead>
//                   <TableHead>Group</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Active</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <img
//                         src="https://ui.shadcn.com/avatars/04.png"
//                         alt="Avatar"
//                         className="h-6 w-6 rounded-full bg-muted"
//                       />
//                     </TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.age}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.notifications}</TableCell>
//                     <TableCell>{user.address}</TableCell>
//                     <TableCell>{user.group}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>{user.active ? "Yes" : "No"}</TableCell>
//                     <TableCell className="flex gap-2">
//                       <Pencil className="h-4 w-4 cursor-pointer" />
//                       <Trash2 className="h-4 w-4 cursor-pointer" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Custom footer here.
//           </p>
//           {/* Pagination */}
//           <div className="mt-4 flex items-center justify-between">
//             <p className="text-sm text-muted-foreground">Total 24</p>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm">
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-primary text-white"
//               >
//                 1
//               </Button>
//               <Button variant="outline" size="sm">
//                 2
//               </Button>
//               <Button variant="outline" size="sm">
//                 3
//               </Button>
//               <Button variant="outline" size="sm">
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//               <select className="rounded border px-2 py-1 text-sm">
//                 <option>10</option>
//                 <option>20</option>
//                 <option>50</option>
//               </select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
// export default Dashboard;
import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "./ui/input";

// ✅ User type definition
type User = {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
  group: string;
  role: string;
  active: boolean;
  notifications: number;
};

// ✅ Dummy data
const users: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: Math.floor(Math.random() * 90 + 5),
  email: "test@test.com",
  address: `London Park no. ${i + 1}`,
  group: i % 3 === 0 ? "admin" : "project_manager",
  role: i % 2 === 0 ? "accountant" : "recruiter",
  active: i % 4 !== 3,
  notifications: Math.floor(Math.random() * 10),
}));

type SortOption = "name-asc" | "name-desc" | "notif-asc" | "notif-desc";

const sortUsers = (
  users: User[],
  sort: SortOption,
  userSearch: string
): User[] => {
  let filtered = users.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
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

const Dashboard = () => {
  const [userSearch, setUserSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredUsers = useMemo(
    () => sortUsers(users, sort, userSearch),
    [sort, userSearch]
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

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
              {/* Sort Dropdown */}
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
                  <DropdownMenuItem onClick={() => setSort("notif-asc")}>
                    Notifications 0-9 ↑
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("notif-desc")}>
                    Notifications 9-0 ↓
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Input */}
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
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden lg:table-cell">Age</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Notifications</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Address
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Group</TableHead>
                  <TableHead className="hidden lg:table-cell">Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <img
                        src="https://ui.shadcn.com/avatars/04.png"
                        alt="Avatar"
                        className="h-6 w-6 rounded-full bg-muted"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.age}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.notifications}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.address}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.group}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.role}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.active ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Pencil className="h-4 w-4 cursor-pointer" />
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

export default Dashboard;
