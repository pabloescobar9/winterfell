import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Clock, TrendingUp } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "HPI Threshold Exceeded",
    location: "Site MW-012",
    time: "5 min ago",
    value: "HPI: 103.2",
    description: "Lead concentration spike detected"
  },
  {
    id: 2,
    type: "warning", 
    title: "Contamination Factor High",
    location: "Site MW-007",
    time: "18 min ago",
    value: "CF: 187.4",
    description: "Multiple heavy metals above normal"
  },
  {
    id: 3,
    type: "info",
    title: "PLI Trend Increasing",
    location: "Site MW-003",
    time: "1 hr ago",
    value: "PLI: 0.89",
    description: "Progressive pollution detected"
  },
  {
    id: 4,
    type: "warning",
    title: "Mercury Levels Elevated", 
    location: "Site MW-015",
    time: "2 hr ago",
    value: "Hg: 0.024 mg/L",
    description: "Above WHO guideline values"
  }
]

export const RecentAlerts = () => {
  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>
      case "info":
        return <Badge variant="outline" className="border-accent text-accent">Info</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "warning":
        return <TrendingUp className="w-4 h-4 text-warning" />
      default:
        return <AlertTriangle className="w-4 h-4 text-accent" />
    }
  }

  return (
    <Card className="shadow-data">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Recent Alerts</CardTitle>
          <Badge variant="outline" className="text-xs">
            {alerts.length} Active
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Latest pollution monitoring alerts and warnings
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {getAlertBadge(alert.type)}
                <span className="text-sm font-medium text-foreground">{alert.title}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-foreground font-medium mb-1">{alert.value}</p>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t border-border">
          <button className="w-full text-sm text-accent hover:text-accent-glow font-medium">
            View All Alerts →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}