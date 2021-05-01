$(function(){

  //REFERENZE HTML
  const allCatsUl = $('#all-cats #all-cats-list')
  const boyCatsUl = $('#gender-cats ul.boy-cats')
  const femaleCatsUl = $('#gender-cats ul.female-cats')
  const allCatsButton = $('#all-cats #show-cats')
  const boysButton = $('#show-boys')
  const girlsButton = $('#show-girls')

  // stato iniziale
  allCatsUl.hide() 
  boyCatsUl.hide() 
  femaleCatsUl.hide() 
  //  CREO ARRAY DI GATTI -> numero gatti scelto da utente => PROMPT // uso funzioni per creare stringhe e numeri casuali per i nomi 
  //let nCats = parseInt(prompt("Inserisci il numero di gatti: "))
  let nCats = 10;
  let cats =[]
  let boys =[]
  let girls =[]
  let femaleFirst =[]

  //creo dinamicamente i gatti
  /* for(let i=0;i<nCats;i++){
    let toAddCat ={
      gender:genderGen(),
      nome: nameGen(numGen(3,8)), // i nomi saranno un numero casuale di caratteri tra 3/8
      age: numGen(1,16),
      color: colorGen()
    }
    cats.push(toAddCat)
  } */
  for(let i=0;i<nCats;i++){
    let gender=genderGen()
    let toAddCat ={
      gender:gender,
      nome: advancedNameGen(gender),
      age: numGen(1,16),
      color: colorGen()
    }
    cats.push(toAddCat)
  }

  //stampo su pagina html i gatti => append
  cats.forEach((cat) => {
    //DECONSTRUCT PROP
    const {nome,age,color,gender} = cat;
    let randomImagetoAdd = randomImage();
    console.log(randomImagetoAdd);
    allCatsUl.append(
      `
        <li class="cat"> 
          <div class="li-content">
            <h2> ${nome}</h2>
            <ul class="noStyle">
              <li>Age: ${age}</li>
              <li>Color: ${color}</li>
              <li>Gender: ${gender}</li>
            </ul>
          </div>
          <div class="image">
            <img src="assets/img/${randomImagetoAdd}" alt="">
          </div>
        </li>
    `
    )
    
  })

  // click button -> slide
  /* $('#all-cats #show-cats').click(function(){
    if($(this).text()=== 'SHOW ALL CATS') $(this).text('HIDE CATS')
    else $(this).text('SHOW ALL CATS')
    $('#all-cats #all-cats-list').slideToggle(function(){

    })
  })
 */
  slideSection(allCatsButton,allCatsUl,allCatsButton.text())
  ////////////////////////////////////////////
  // MILESTONE 2
  ///////////////////////////////////////////
  // Uso due sezioni diverse in base al genere

  cats.forEach(cat => {
    const {nome,age,color,gender} = cat;
    //calcolo transparenza
    let transparency = cat.age/16
    if(cat.gender === 'Male'){
    boys.push(cat)
    boyCatsUl.append(
      `
        <li class="cat"> 
          <div class="li-content">
            <h2> ${nome} <i style="color:rgba(81, 211, 255,${transparency} );" class="fas fa-fan"></i></h2> 
            <ul class="noStyle">
              <li>Age: ${age}</li>
              <li>Color: ${color}</li>
            </ul>
          </div>
        </li>
    `
    )
    }else{
      girls.push(cat)
      femaleCatsUl.append(
        `
          <li class="cat"> 
            <div class="li-content">
              <h2> ${nome} <i style="color:rgba(255, 61, 177,${transparency} );" class="fas fa-fan"></i></h2> 
              <ul class="noStyle">
                <li>Age: ${age}</li>
                <li>Color: ${color}</li>
              </ul>
            </div>
          </li>
      `
      )
    }
  })
  slideSection(boysButton,boyCatsUl,boysButton.text())
  slideSection(girlsButton,femaleCatsUl,girlsButton.text())

  /////////////////////////////////
  //MILESTONE 3
  /////////////////////////////////

  //RIMUOVO DA CIASCUNO LE PROPRIETA NON INTERESSATE ( AGE,GENDER) aggiungendo parametri su bow e trasparenza

  boys.forEach(cat=>{
    cat.bowColor = 'lightblue'
    cat.bowTransparency = cat.age/16
    delete cat.age
    delete cat.gender
  })
  girls.forEach(cat=>{
    cat.bowColor = 'pink'
    cat.bowTransparency = cat.age/16
    delete cat.age
    delete cat.gender
  })

  femaleFirst =[...girls,...boys]
  console.log("Array con prima female \n",femaleFirst);
  
  // FUNZIONI



  function numGen(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function nameGen(characters){
    let generatedName ='';
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for(let i =0;i<characters;i++){
      generatedName+= alphabet[numGen(0,alphabet.length-1)]
    }
    return generatedName;
  }
  function genderGen(){
    const genders = ['Male', 'Female'];
    return genders[numGen(0,1)]
  }
  function colorGen(){
   const colors =['White','Black', 'Grey', 'Brown','Cinnamon']
   return colors[numGen(0,colors.length-1)]
  }

  function slideSection(clickedButton, target,buttonText){
    clickedButton.click(function(){
      if(clickedButton.text()===buttonText) clickedButton.text('HIDE')
      else clickedButton.text(buttonText)
      target.slideToggle()
    })
  }

  function advancedNameGen(gender) {
    if(gender === 'Male'){
      const maleNames =['Alex','Charlie','Coco','Cosmo','Felix','Figaro','Fluffy','Gatsby']
      return maleNames[numGen(0,maleNames.length-1)]
    }else{
      const femaleNames =['Alice','Bella','Briciola','Chloe','Daisy','Eve','Fiona','Kiki']
      return femaleNames[numGen(0,femaleNames.length-1)]
    }
  }
  function randomImage(){
    const images =['cat1.jpg','cat2.jpg','cat3.jpg','cat4.jpg','cat5.jpg','cat6.jpg','cat7.jpg','cat8.jpg']
    return images[numGen(0,images.length-1)]
  }
})