import BumpChart from "@/components/client/dashboard/bump-chart";
import RadialBarChart from "@/components/client/dashboard/radialbar-chart";
import { SearchBar } from "@/components/client/dashboard/search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 m-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card className="h-96">
          <CardHeader>
            <CardTitle>Weekly results</CardTitle>
          </CardHeader>
          <CardContent className="h-3/4 w-full p-0">
            <BumpChart />
          </CardContent>
        </Card>

        <Card className="h-96">
          <CardHeader>
            <CardTitle>Quaterly results</CardTitle>
          </CardHeader>
          <CardContent className="h-3/4 w-full p-0">
            <RadialBarChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="min-h-96">
          <CardContent className=" h-3/4 w-full p-0">
            <SearchBar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
