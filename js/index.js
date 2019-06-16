(function() {

  $( document ).ready(function() {
    $("html").addClass("stop-scrolling")
  })

  const TDEE = ko.observable()

  const Gender = ko.observable("Male")
  const MeasurementType = ko.observable("Metric")

  const Height = ko.observable()
  const Weight = ko.observable()
  const Age = ko.observable()
  const BodyFat = ko.observable()

  const EntryView = ko.observable(true)
  const DataView = ko.observable(false)

  const Calculate = () => {
  	if(NullOrBlankAlert(Height(), "Height") || NullOrBlankAlert(Weight(), "Weight") || NullOrBlankAlert(Age(), "Age")) return

	  TDEE(CalculateTDEE())

	  Toggle()
  }

  const MifflinStJeor = () => {
    var TempWeight = MeasurementType() == 'Metric' ? Weight() : ConvertWeight(Weight())
    var TempHeight = MeasurementType() == 'Metric' ? Height() : ConvertHeight(Height())

  	return Math.round(10*TempWeight + 6.25*TempHeight - 5*Age() + (Gender() == "Male" ? 5 : -161))
  }

  const KatchMcArdle = () => {
    var TempWeight = MeasurementType() == 'Metric' ? Weight() : ConvertWeight(Weight())
    return 370 + (21.6*(TempWeight*(1 - (BodyFat()/100))))
  }

  const CalculateTDEE = () => {
    var BMR = NullOrBlankCheck(BodyFat()) ? MifflinStJeor() : KatchMcArdle()
	   return Math.round(BMR*1.2)
  }

  const ConvertWeight = (lb) => {
    return lb/2.2
  }

  const ConvertHeight = (imp) => {
    var Feet = parseInt(imp.split(',')[0])
    var Inch = parseInt(imp.split(',')[1])

    var TotalInch = Feet*12 + Inch

    return TotalInch*2.54
  }

  const DisplayImp = (imp) => {
    return imp.split(',')[0] + "'" + imp.split(',')[1] + "\""
  }

  const Toggle = () => {
  	EntryView(!EntryView())
  	DataView(!DataView())

    EntryView() ? $("html").addClass("stop-scrolling") : $("html").removeClass("stop-scrolling")
  }

  const NullOrBlankAlert = (value, name) => {
  	if(value == "" || value == null) {
  		alert(name + " is a required field and cannot be blank.")
  		return true
  	}
  	return false
  }

  const NullOrBlankCheck = (value) => {
    if(value == "" || value == null) {
      return true
    }
    return false
  }

  ko_model = {
    TDEE: TDEE,

    Gender: Gender,
    MeasurementType: MeasurementType,

    Weight: Weight,
    Height: Height,
    Age: Age,
    BodyFat: BodyFat,

    EntryView: EntryView,
    DataView: DataView,

    Calculate: Calculate,
    Toggle: Toggle,

    DisplayImp: DisplayImp,
    ImperialHeights: ko.observableArray(["4,0", "4,1", "4,2", "4,3", "4,4", "4,5", "4,6", "4,7", "4,8", "4,9", "4,10", "4,11", "5,0", "5,1", "5,2", "5,3", "5,4", "5,5", "5,6", "5,7", "5,8", "5,9", "5,10", "5,11", "6,0", "6,1", "6,2", "6,3", "6,4", "6,5", "6,6", "6,7", "6,8", "6,9", "6,10", "6,11", "7,0"])
  }

})()

ko_model.MeasurementType.subscribe(function() {
  ko_model.Weight("")
  ko_model.Height("")
})

ko.applyBindings(ko_model)
