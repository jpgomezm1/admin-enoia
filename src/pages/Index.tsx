
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassCard from "@/components/ui/ClassCard";
import { classes, formatDate, isToday, isTomorrow } from '@/utils/data';
import { BarChart, Clock, Users } from 'lucide-react';

const Index = () => {
  const todayClasses = classes.filter(cls => isToday(cls.date));
  const tomorrowClasses = classes.filter(cls => isTomorrow(cls.date));
  const [activeTab, setActiveTab] = useState("hoy");
  
  const displayedClasses = activeTab === "hoy" ? todayClasses : tomorrowClasses;
  
  // Stats for today
  const totalAttendeesToday = todayClasses.reduce((acc, cls) => acc + cls.attendees, 0);
  const totalCapacityToday = todayClasses.reduce((acc, cls) => acc + cls.maxCapacity, 0);
  const occupancyRate = totalCapacityToday > 0 
    ? Math.round((totalAttendeesToday / totalCapacityToday) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-display">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administración de Enoia Barre Studio.</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Clases Hoy</CardDescription>
            <CardTitle className="text-3xl font-display flex items-center gap-2">
              {todayClasses.length}
              <Clock className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Asistentes Hoy</CardDescription>
            <CardTitle className="text-3xl font-display flex items-center gap-2">
              {totalAttendeesToday}
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Tasa de Ocupación</CardDescription>
            <CardTitle className="text-3xl font-display flex items-center gap-2">
              {occupancyRate}%
              <BarChart className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      {/* Classes tabs */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-display">Próximas Clases</CardTitle>
          <CardDescription>Vista rápida de tus clases para hoy y mañana</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="hoy" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="hoy">Hoy</TabsTrigger>
            <TabsTrigger value="manana">Mañana</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hoy" className="m-0">
            {todayClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayClasses.map((cls) => (
                  <ClassCard key={cls.id} {...cls} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No hay clases programadas para hoy.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="manana" className="m-0">
            {tomorrowClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tomorrowClasses.map((cls) => (
                  <ClassCard key={cls.id} {...cls} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No hay clases programadas para mañana.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Index;
