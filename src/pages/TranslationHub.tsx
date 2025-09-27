import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  Volume2,
  FileText,
  Loader2,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const TranslationHub = () => {
  const { toast } = useToast()
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("english")
  const [targetLang, setTargetLang] = useState("hindi")
  const [isTranslating, setIsTranslating] = useState(false)

  const indianLanguages = [
    { code: "english", name: "English", native: "English" },
    { code: "hindi", name: "Hindi", native: "हिंदी" },
    { code: "bengali", name: "Bengali", native: "বাংলা" },
    { code: "telugu", name: "Telugu", native: "తెలుగు" },
    { code: "marathi", name: "Marathi", native: "मराठी" },
    { code: "tamil", name: "Tamil", native: "தமிழ்" },
    { code: "gujarati", name: "Gujarati", native: "ગુજરાતી" },
    { code: "urdu", name: "Urdu", native: "اردو" },
    { code: "kannada", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "odia", name: "Odia", native: "ଓଡ଼ିଆ" },
    { code: "malayalam", name: "Malayalam", native: "മലയാളം" },
    { code: "punjabi", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { code: "assamese", name: "Assamese", native: "অসমীয়া" },
    { code: "maithili", name: "Maithili", native: "मैथिली" },
    { code: "sanskrit", name: "Sanskrit", native: "संस्कृतम्" },
    { code: "nepali", name: "Nepali", native: "नेपाली" },
    { code: "kashmiri", name: "Kashmiri", native: "कॉशुर" },
    { code: "konkani", name: "Konkani", native: "कोंकणी" },
    { code: "sindhi", name: "Sindhi", native: "سنڌي" },
    { code: "dogri", name: "Dogri", native: "डोगरी" },
    { code: "manipuri", name: "Manipuri", native: "মেইতেইলোন্" },
    { code: "bodo", name: "Bodo", native: "बर'" },
    { code: "santhali", name: "Santhali", native: "ᱥᱟᱱᱛᱟᱲᱤ" }
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text to translate",
        variant: "destructive"
      })
      return
    }

    setIsTranslating(true)
    
    // Simulate AI translation with cultural context
    setTimeout(() => {
      const sourceLangObj = indianLanguages.find(lang => lang.code === sourceLang)
      const targetLangObj = indianLanguages.find(lang => lang.code === targetLang)
      
      // Simulated translation with cultural adaptation
      let simulatedTranslation = ""
      
      if (targetLang === "hindi") {
        simulatedTranslation = "व्यावसायिक शिक्षा और प्रशिक्षण में इस तकनीक का उपयोग करके, हम भारतीय शिक्षार्थियों को उनकी मातृभाषा में गुणवत्तापूर्ण सामग्री प्रदान कर सकते हैं।"
      } else if (targetLang === "tamil") {
        simulatedTranslation = "தொழில்நுட்ப கல்வி மற்றும் பயிற்சியில் இந்த தொழில்நுட்பத்தைப் பயன்படுத்துவதன் மூலம், இந்தியக் கற்போருக்கு அவர்களின் தாய்மொழியில் தரமான உள்ளடக்கத்தை வழங்க முடியும்."
      } else if (targetLang === "bengali") {
        simulatedTranslation = "কারিগরি শিক্ষা ও প্রশিক্ষণে এই প্রযুক্তি ব্যবহার করে, আমরা ভারতীয় শিক্ষার্থীদের তাদের মাতৃভাষায় মানসম্পন্ন বিষয়বস্তু প্রদান করতে পারি।"
      } else {
        simulatedTranslation = `[${targetLangObj?.name} Translation] Professional translation with cultural adaptation and domain-specific terminology for vocational training content.`
      }
      
      setTranslatedText(simulatedTranslation)
      setIsTranslating(false)
      
      toast({
        title: "Translation Complete",
        description: `Text successfully translated to ${targetLangObj?.name}`,
      })
    }, 2000)
  }

  const handleSwapLanguages = () => {
    if (sourceLang === "english" || targetLang === "english") {
      const temp = sourceLang
      setSourceLang(targetLang)
      setTargetLang(temp)
      setSourceText(translatedText)
      setTranslatedText(sourceText)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
    toast({
      title: "Copied!",
      description: "Translation copied to clipboard"
    })
  }

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang = targetLang
      speechSynthesis.speak(utterance)
      
      toast({
        title: "Playing Audio",
        description: "Text-to-speech started"
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Translation Hub</h1>
        <p className="text-muted-foreground text-lg">
          AI-powered translation with cultural adaptation for vocational training content
        </p>
      </div>

      {/* Language Selector */}
      <Card className="professional-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Source Language</label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {indianLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground text-sm">({lang.native})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSwapLanguages}
              className="mt-6 h-12 w-12 hover:shadow-card transition-smooth"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </Button>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Target Language</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {indianLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground text-sm">({lang.native})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Source Text
            </CardTitle>
            <CardDescription>
              Enter the vocational training content to translate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your vocational training content here. The AI will ensure contextual accuracy and cultural adaptation..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={12}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {sourceText.length} characters
              </Badge>
              <Button 
                onClick={handleTranslate}
                disabled={isTranslating || !sourceText.trim()}
                className="gradient-primary text-white"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="w-4 h-4 mr-2" />
                    Translate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translated Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Translation Result
            </CardTitle>
            <CardDescription>
              AI-translated content with cultural adaptation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={translatedText}
              readOnly
              rows={12}
              className="resize-none bg-muted/30"
              placeholder="Translation will appear here..."
            />
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {translatedText.length} characters
              </Badge>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleTextToSpeech}
                  disabled={!translatedText}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopy}
                  disabled={!translatedText}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={!translatedText}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Translation Features */}
      <Card>
        <CardHeader>
          <CardTitle>Translation Features</CardTitle>
          <CardDescription>
            Our AI ensures comprehensive localization beyond simple translation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <h4 className="font-medium">Cultural Adaptation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Content is adapted to regional cultural contexts and learning preferences
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <h4 className="font-medium">Domain Terminology</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Industry-specific vocabulary and technical terms are accurately translated
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h4 className="font-medium">Quality Assurance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                AI feedback loops continuously improve translation accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TranslationHub