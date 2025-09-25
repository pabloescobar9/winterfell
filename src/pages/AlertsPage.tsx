import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Filter, Bell } from "lucide-react"

export const AlertsPage = () => {
  const allAlerts = [
    {
      id: 1,
      type: "critical",
      title: "HPI Critical Threshold Exceeded",
      location: "Site MW-012",
      time: "5 min ago",
      value: "HPI: 103.2",
      description: "Lead concentration spike detected - immediate action required"
    },
    {
      id: 2,
      type: "warning", 
      title: "Contamination Factor High",
      location: "Site MW-007",
      time: "18 min ago",
      value: "CF: 187.4",
      description: "Multiple heavy metals above normal levels"
    },
    {
      id: 3,
      type: "resolved",
      title: "Mercury Levels Normalized",
      location: "Site MW-004",
      time: "45 min ago",
      value: "Hg: 0.001 mg/L",
      description: "Previously elevated mercury levels have returned to normal"
    }
  ]

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>
      case "resolved":
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-destructive" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-success" />
      default:
        return <AlertTriangle className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Monitor critical pollution levels and system alerts
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-data border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-data border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-warning">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-data border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">8</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <Card className="shadow-data">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getAlertBadge(alert.type)}
                  <span className="text-sm font-medium text-foreground">{alert.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>📍 {alert.location}</span>
                  <span>🕒 {alert.time}</span>
                  <span className="font-medium">{alert.value}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}