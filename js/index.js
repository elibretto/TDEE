(function() {

  const TDEE = ko.observable()
  const BMR = ko.observable()

  const Gender = ko.observable("Male")
  const Height = ko.observable()
  const Weight = ko.observable()
  const Age = ko.observable()
  const BodyFat = ko.observable()

  const EntryView = ko.observable(true)
  const DataView = ko.observable(false)

  const Calculate = () => {
  	if(NullOrBlankCheck(Height(), "Height") || NullOrBlankCheck(Weight(), "Weight") || NullOrBlankCheck(Age(), "Age")) return

	  TDEE(CalculateTDEE())

	  Toggle()
  }

  const CalculateBMR = () => {
  	return Math.round(10*Weight() + 6.25*Height() - 5*Age() + (Gender() == "Male" ? 5 : -161))
  }

  const CalculateTDEE = () => {
	return Math.round(CalculateBMR()*1.2)
  }

  const Toggle = () => {
  	EntryView(!EntryView())
  	DataView(!DataView())
  }

  const NullOrBlankCheck = (value, name) => {
  	if(value == "" || value == null) {
  		alert(name + " is a required field and cannot be blank.")
  		return true
  	}
  	return false
  }

  ko_model = {
    TDEE: TDEE,

    Gender: Gender,
    Weight: Weight,
    Height: Height,
    Age: Age,
    BodyFat: BodyFat,

    EntryView: EntryView,
    DataView: DataView,

    Calculate: Calculate,
    Toggle: Toggle
  }

})()
ko.applyBindings(ko_model)
