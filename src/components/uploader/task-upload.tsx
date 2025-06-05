import { useState } from "react";

import { UploadCloudIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const UploadTaskForm = () => {
  const [title, setTitle] = useState("Youtube");

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-8">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold md:text-xl">
            <UploadCloudIcon />
            Upload New Task
          </h2>

          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Select value={title} onValueChange={setTitle}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="YouTube" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tik-tok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              placeholder="Brief task instructions..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external">External Link (e.g., YouTube URL)</Label>
            <Input
              id="external"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="in-active">In-Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-green-600 text-white hover:bg-green-700">
            Upload Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadTaskForm;
