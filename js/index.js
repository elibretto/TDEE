(function() {

  const TDEE = ko.observable()
  const BMR = ko.observable()

  const Weight = ko.observable()
  const Height = ko.observable()
  const Age = ko.observable()
  const Gender = ko.observable()
  const TDEEMultiplier = ko.observable()

  const EntryView = ko.observable(true)
  const DataView = ko.observable(false)

  const Calculate = () => {
  	BMR(CalculateBMR())
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

  ko_model = {
    TDEE: TDEE,
    Weight: Weight,
    Height: Height,
    Age: Age,
    Gender: Gender,

    EntryView: EntryView,
    DataView: DataView,

    Calculate: Calculate,
    Toggle: Toggle
  }

})()
ko.applyBindings(ko_model)
