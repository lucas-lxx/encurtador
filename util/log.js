exports.log = (name, foo) => {
  console.log(`=============start ${name}========================`);
  foo();
  console.log(`===============end ${name}========================`);
}
