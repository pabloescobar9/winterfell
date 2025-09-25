import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileInput, MapPin, Calculator } from "lucide-react"

export const DataEntryPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Entry</h1>
        <p className="text-muted-foreground mt-1">
          Input new water sample data and calculate pollution indices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Information */}
        <Card className="shadow-data">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Sample Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-id">Site ID</Label>
              <Input id="site-id" placeholder="MW-001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" placeholder="40.7128" />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" placeholder="-74.0060" />
              </div>
            </div>
            <div>
              <Label htmlFor="sample-date">Sample Date</Label>
              <Input id="sample-date" type="date" />
            </div>
          </CardContent>
        </Card>

        {/* Heavy Metal Concentrations */}
        <Card className="shadow-data">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileInput className="w-5 h-5 text-secondary" />
              <span>Metal Concentrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Lead (Pb)', 'Cadmium (Cd)', 'Arsenic (As)', 'Mercury (Hg)', 'Chromium (Cr)'].map((metal) => (
              <div key={metal}>
                <Label htmlFor={metal.toLowerCase()}>{metal}</Label>
                <Input 
                  id={metal.toLowerCase()} 
                  placeholder="0.000" 
                  type="number" 
                  step="0.001"
                />
                <span className="text-xs text-muted-foreground">mg/L</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calculated Indices */}
        <Card className="shadow-data">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-accent" />
              <span>Calculated Indices</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Heavy Metal Pollution Index</p>
                <p className="text-2xl font-bold text-foreground">--</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Contamination Factor</p>
                <p className="text-2xl font-bold text-foreground">--</p>
              </div>
              <Button className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Indices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}