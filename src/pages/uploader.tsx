import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploaderProfile from "@/components/uploader/profile";
import UploadTaskForm from "@/components/uploader/task-upload";
import UploaderDashboard from "@/components/uploader/uploader-dashboard";

const Uploader = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Uploader</h1>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Task Upload</TabsTrigger>
          <TabsTrigger value="created">Profile</TabsTrigger>
        </TabsList>

        {/* Create the task and Upload */}
        <TabsContent value="users">
          <UploadTaskForm />
        </TabsContent>

        {/* Uploader Profile */}
        <TabsContent value="created">
          <UploaderProfile />
        </TabsContent>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <UploaderDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Uploader;
