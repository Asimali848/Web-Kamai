import { useState } from "react";

import { ArrowLeft, Camera, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Done from "@/assets/img/1.png";
import audit from "@/assets/img/2.png";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomToast from "@/components/ui/custom-toast";

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false); // NEW

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Please upload an image before submitting the task."
        />
      ));
      return; // Prevent further execution
    }

    toast.custom(() => (
      <CustomToast
        type="success"
        title="Success"
        description="Task submitted successfully!"
      />
    ));

    // You can send `image` to the backend here if needed
    console.log("Submitting image:", image);

    setSubmitted(true); // Only after successful upload
  };

  return (
    <MaxWidthWrapper>
      <div className="flex items-center p-4">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/task-list")}
        >
          <ArrowLeft className="mr-3 h-5 w-5" />
          <h1 className="text-lg font-medium">Back</h1>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4">
        {/* Task Card */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-gray-500">Task title:</h3>
                  <span className="font-medium">YouTube</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="text-sm text-gray-500">Task benefits:</h3>
                  <span className="font-medium text-green-600">Rs +20.00</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="text-sm text-gray-500">Task description:</h3>
                  <span className="font-medium">YouTube</span>
                </div>
              </div>

              <div className="relative">
                {/* Conditional rendering of images */}
                <img
                  src={submitted ? audit : Done}
                  alt="Status"
                  className="size-20"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="mb-1 text-sm text-gray-500">
                Upload requirements:
              </h3>
              <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-dashed border-green-500 bg-green-50">
                <Button variant="ghost" className="rounded-full p-2">
                  <Camera className="h-8 w-8 text-gray-400" />
                </Button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4"
              />
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  className="mx-auto mt-4 size-16 rounded-lg object-cover"
                />
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <h3 className="text-sm text-gray-500">Date of audit:</h3>
              <span className="font-medium">
                {submitted ? new Date().toLocaleDateString() : ""}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* User Info & Link Section */}
        <Card className="w-full">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100">
                <img
                  src="/api/placeholder/40/40"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Demand side</p>
                <p className="text-sm text-gray-500">
                  *****97242 · 2025-04-13-15:08:37 Release
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-md bg-blue-50 p-2">
              <a
                href="https://www.youtube.com/watch?v=tG-HL-ZjhloeO"
                className="flex-1 truncate text-sm text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.youtube.com/watch?v=tG-HL-ZjhloeO
              </a>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="px-4 pb-4 pt-0">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Open
            </Button>
          </CardFooter>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-teal-500 hover:bg-teal-600"
          disabled={submitted}
        >
          {submitted ? "Task Submitted" : "Submit completed task"}
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
