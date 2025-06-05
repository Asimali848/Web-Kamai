import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UploaderProfilePage() {
  return (
    <div className="mx-auto w-full space-y-6 p-4 md:p-8">
      <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
        My Profile
      </h1>

      {/* Profile Card */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-6">
          <div className="h-24 w-24 overflow-hidden rounded-full">
            <img
              src="https://ui.shadcn.com/avatars/02.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Natashia Khaleira</h2>
            <p className="text-sm text-muted-foreground">Admin</p>
            <p className="text-sm text-muted-foreground">
              Leeds, United Kingdom
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-md font-semibold">Personal Information</h3>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <Label className="text-muted-foreground">First Name</Label>
              <p>Natashia</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Last Name</Label>
              <p>Khaleira</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Date of Birth</Label>
              <p>12-10-1990</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email Address</Label>
              <p>info@binary-fusion.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone Number</Label>
              <p>(+62) 821 2554-5846</p>
            </div>
            <div>
              <Label className="text-muted-foreground">User Role</Label>
              <p>Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-md font-semibold">Address</h3>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <Label className="text-muted-foreground">Country</Label>
              <p>United Kingdom</p>
            </div>
            <div>
              <Label className="text-muted-foreground">City</Label>
              <p>Leeds, East London</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Postal Code</Label>
              <p>ERT 1254</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
