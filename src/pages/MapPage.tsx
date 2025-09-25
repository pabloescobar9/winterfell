import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Filter, Download, RefreshCw, Calendar } from "lucide-react"
import { ContaminationMap } from "@/components/ContaminationMap"

// Sample monitoring site data
const monitoringSites = [
  {
    id: "MW-001",
    name: "Monitoring Well MW-001",
    lat: 40.7589,
    lng: -73.9851,
    hpi: 45.2,
    hei: 28.1,
    cf: 76.3,
    pli: 0.45,
    lastSample: "2024-01-20",
    metals: { pb: 0.018, cd: 0.005, as: 0.012, hg: 0.002, cr: 0.048 }
  },
  {
    id: "MW-002", 
    name: "Monitoring Well MW-002",
    lat: 40.7505,
    lng: -73.9934,
    hpi: 87.6,
    hei: 52.3,
    cf: 142.8,
    pli: 0.73,
    lastSample: "2024-01-20",
    metals: { pb: 0.045, cd: 0.012, as: 0.028, hg: 0.005, cr: 0.089 }
  },
  {
    id: "MW-003",
    name: "Monitoring Well MW-003", 
    lat: 40.7614,
    lng: -73.9776,
    hpi: 103.4,
    hei: 68.9,
    cf: 189.5,
    pli: 0.89,
    lastSample: "2024-01-19",
    metals: { pb: 0.067, cd: 0.018, as: 0.041, hg: 0.008, cr: 0.125 }
  },
  {
    id: "MW-004",
    name: "Monitoring Well MW-004",
    lat: 40.7282,
    lng: -73.9942,
    hpi: 23.1,
    hei: 15.7,
    cf: 34.2,
    pli: 0.28,
    lastSample: "2024-01-20",
    metals: { pb: 0.008, cd: 0.002, as: 0.005, hg: 0.001, cr: 0.015 }
  },
  {
    id: "MW-005",
    name: "Monitoring Well MW-005",
    lat: 40.7128,
    lng: -74.0060,
    hpi: 156.7,
    hei: 94.2,
    cf: 267.3,
    pli: 1.12,
    lastSample: "2024-01-19",
    metals: { pb: 0.098, cd: 0.025, as: 0.063, hg: 0.012, cr: 0.187 }
  },
  {
    id: "MW-006",
    name: "Monitoring Well MW-006",
    lat: 40.7423,
    lng: -74.0059,
    hpi: 67.4,
    hei: 41.8,
    cf: 98.7,
    pli: 0.58,
    lastSample: "2024-01-20",
    metals: { pb: 0.032, cd: 0.008, as: 0.019, hg: 0.003, cr: 0.062 }
  }
]

export const MapPage = () => {
  const [filters, setFilters] = useState({
    dateRange: "all",
    metalType: "all", 
    contamination: "all"
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const getContaminationStats = () => {
    const critical = monitoringSites.filter(site => site.hpi > 100).length
    const high = monitoringSites.filter(site => site.hpi > 80 && site.hpi <= 100).length
    const moderate = monitoringSites.filter(site => site.hpi > 40 && site.hpi <= 80).length
    const low = monitoringSites.filter(site => site.hpi <= 40).length
    
    return { critical, high, moderate, low }
  }

  const stats = getContaminationStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contamination Map</h1>
          <p className="text-muted-foreground mt-1">
            Geographic visualization of heavy metal contamination across monitoring sites
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-data border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Sites</p>
                <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-data border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-data border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Moderate</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.moderate}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-data border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Risk</p>
                <p className="text-2xl font-bold text-success">{stats.low}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-data">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Map Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Metal Type</label>
              <Select value={filters.metalType} onValueChange={(value) => setFilters({...filters, metalType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metals</SelectItem>
                  <SelectItem value="pb">Lead (Pb)</SelectItem>
                  <SelectItem value="cd">Cadmium (Cd)</SelectItem>
                  <SelectItem value="as">Arsenic (As)</SelectItem>
                  <SelectItem value="hg">Mercury (Hg)</SelectItem>
                  <SelectItem value="cr">Chromium (Cr)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contamination Level</label>
              <Select value={filters.contamination} onValueChange={(value) => setFilters({...filters, contamination: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contamination level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High Risk Only</SelectItem>
                  <SelectItem value="medium">Moderate Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="shadow-data">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Interactive Contamination Map</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                <div className="w-2 h-2 rounded-full bg-success mr-1"></div>
                {monitoringSites.length} Sites Active
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Click on monitoring site markers to view detailed contamination data and pollution indices
          </p>
        </CardHeader>
        <CardContent>
          <ContaminationMap sites={monitoringSites} selectedFilters={filters} />
        </CardContent>
      </Card>

      {/* Site List */}
      <Card className="shadow-data">
        <CardHeader>
          <CardTitle>Monitoring Sites Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monitoringSites.map((site) => {
              const getStatusBadge = (hpi: number) => {
                if (hpi > 100) return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
                if (hpi > 80) return <Badge className="bg-orange-500 text-white">High Risk</Badge>
                if (hpi > 40) return <Badge className="bg-yellow-500 text-white">Moderate</Badge>
                return <Badge className="bg-success text-success-foreground">Low Risk</Badge>
              }

              return (
                <div 
                  key={site.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{site.name}</span>
                    </div>
                    {getStatusBadge(site.hpi)}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div>HPI: <span className="font-medium text-foreground">{site.hpi}</span></div>
                    <div>CF: <span className="font-medium text-foreground">{site.cf}</span></div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{site.lastSample}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}