var name = "Hi, My name is Pramod.";
var age = 4;
var tmpAge;
var yearsToGo;
const LegalAgeToDrink = 21;
console.log(name, age);
for (var i = 1; i < 21; i++) {
	tmpAge = age+1;
	yearsToGo = LegalAgeToDrink - tmpAge;
}
