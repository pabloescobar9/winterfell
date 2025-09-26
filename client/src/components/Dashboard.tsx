import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Droplets,
  Activity,
  MapPin,
  Clock
} from "lucide-react"
import { PollutionChart } from "@/components/PollutionChart"
import { RecentAlerts } from "@/components/RecentAlerts"

export const Dashboard = () => {
  const pollutionIndices = [
    {
      title: "Heavy Metal Pollution Index",
      value: "87.3",
      unit: "HPI",
      status: "warning",
      change: "+2.1",
      trend: "up",
      description: "Critical threshold: 100"
    },
    {
      title: "Heavy Metal Evaluation Index", 
      value: "42.6",
      unit: "HEI",
      status: "success",
      change: "-1.4",
      trend: "down",
      description: "Low pollution level"
    },
    {
      title: "Contamination Factor",
      value: "156.2",
      unit: "CF",
      status: "danger",
      change: "+8.7",
      trend: "up",
      description: "High contamination detected"
    },
    {
      title: "Pollution Load Index",
      value: "0.73",
      unit: "PLI",
      status: "warning",
      change: "+0.05",
      trend: "up",
      description: "Progressive pollution"
    }
  ]

  const quickStats = [
    { label: "Active Monitoring Sites", value: "28", icon: MapPin },
    { label: "Samples Today", value: "15", icon: Droplets },
    { label: "System Uptime", value: "99.8%", icon: Activity },
    { label: "Last Update", value: "2 min ago", icon: Clock },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-success text-success-foreground"
      case "warning": return "bg-warning text-warning-foreground" 
      case "danger": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string, status: string) => {
    if (status === "success" && trend === "down") return "text-success"
    if (status === "success" && trend === "up") return "text-success"
    if (trend === "up") return "text-destructive"
    return "text-success"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Groundwater Monitoring Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time heavy metal pollution monitoring and analysis
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="shadow-data">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pollution Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pollutionIndices.map((index, i) => {
          const TrendIcon = getTrendIcon(index.trend)
          return (
            <Card key={i} className="shadow-ocean hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">
                    {index.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(index.status)} text-xs`}>
                    {index.unit}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-foreground">{index.value}</span>
                  <div className={`flex items-center text-sm ${getTrendColor(index.trend, index.status)}`}>
                    <TrendIcon className="w-4 h-4 mr-1" />
                    {index.change}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{index.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PollutionChart />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>
    </div>
  )
}