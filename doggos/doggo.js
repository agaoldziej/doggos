
const wonderfulPetBtn = document.querySelector(".wonderful-pet")
const saveButton = document.querySelector('.save')
const containerEl = document.querySelector('.container')
const inputNameEl = document.querySelector('.dog-name')
const imgEl = document.querySelector('.dog-photo')
const selectEl = document.querySelector('#trait')
const clearAllBtn = document.querySelector("#clear-all")

const doggoImages = [
  "https://img-9gag-fun.9cache.com/photo/aD415zw_460s.jpg",
  "https://pbs.twimg.com/profile_images/805808226730053632/KKGO8WTb_400x400.jpg",
  "https://stupiduglydogs.files.wordpress.com/2014/11/image.jpg",
  "https://ilovemydogsomuch.tv/wp-content/uploads/2019/05/derpfeat.jpg",
  "https://i.redd.it/6gsacl3epji11.jpg",
  "https://static.fajnyzwierzak.pl/media/uploads/media_image/original/wpis/672/welsh-corgi-pembroke.jpg"
]

const names = [
  "Całka", "Piksel", "Szatan", "Reks", 
  "Puszek", "Mia", "Brutus", "Bubuś", "Murzyn", "Fryga", "Lord", "Ciapek"
]

const onWonderfulBtnClick = () => {
  inputNameEl.value = getRandomValueFromArray(names);

  imgEl.setAttribute('src', getRandomValueFromArray(doggoImages))

  const traits = Array.from(selectEl.options).map(option => option.value)
  selectEl.value =  getRandomValueFromArray(traits);

}

const getRandomValueFromArray = (anyArray) => 
  anyArray[Math.floor(Math.random() * anyArray.length)]


const onSaveBtnClick = () => {
  const name = inputNameEl.value;
  const trait = selectEl.value;
  const imageUrl = imgEl.getAttribute('src');

  const dog = {
    name,
    trait,
    imageUrl
  }

  const savedDogs = JSON.parse(localStorage.getItem('dogs'))

  if(savedDogs !== null && savedDogs.length > 0) {
    // 1. znajdźmy największe ID pieska
    const dogIds = savedDogs.map(dog => dog.id)
    const maxId = Math.max(...dogIds)
    // 2. Nadanie id nowemu pieskowi
    dog.id = maxId + 1;

    // 3. Dołączenie pieska do tablicy
    savedDogs.unshift(dog)
    // const updatedDogs = [ {...dog}, ...savedDogs]

    // 4. Zapisanie tablicy piesków

    localStorage.setItem('dogs', JSON.stringify(savedDogs))

  } else {
    dog.id = 0;
    // const dogAsArray = [{...dog}]
    const dogAsArray = [{
      name,
      imageUrl,
      id: 0,
      trait
    }]
    localStorage.setItem('dogs', JSON.stringify(dogAsArray))
  }

  generateUIForSavedDog(dog)
}

const generateUIForSavedDog = (dog) => {
  const savedDogsContainer = document.querySelector('.saved-dogs-container')
  
  const dogContainer = document.createElement('div')

  dogContainer.setAttribute('class', 'saved-dog-container')

  const img = document.createElement('img')
  img.setAttribute('src', dog.imageUrl)

  const dogDescriptionEl = document.createElement('p')
  dogDescriptionEl.textContent =  `${dog.name} is ${dog.trait}`;

  const deleteButton = document.createElement('button')
  deleteButton.textContent = "x"
  // deleteButton.addEventListener('click', () => {
  //   console.log("You clicked delete")
  // })

  deleteButton.onclick = () => {
    removeFromStorage(dog.id)
  }

  dogContainer.appendChild(img)
  dogContainer.appendChild(dogDescriptionEl)
  dogContainer.appendChild(deleteButton)

  savedDogsContainer.appendChild(dogContainer)
}

const recreateUI = () => {
  const savedDogs = JSON.parse(localStorage.getItem('dogs'))
  if(savedDogs === null || savedDogs.length === 0) {
    return;
  }

  savedDogs.forEach(dog => {
    generateUIForSavedDog(dog)
  })
}

const removeFromStorage = (id) => {
  //1. Odczytanie zapisanych piesków z localStorage
  const savedDogs = JSON.parse(localStorage.getItem('dogs'))
  //2. Wyfiltrowanie piesków które mają pozostać w localStorage

  const filteredDogs = savedDogs.filter(dog => dog.id !== id)
  console.log(filteredDogs)
  //3. Zapisanie nowych piesków do localStorage
  localStorage.setItem('dogs', JSON.stringify(filteredDogs))
  //4. Odświeżenie interfejsu użytkownika 
  const savedDogsContainer = document.querySelector('.saved-dogs-container')
  savedDogsContainer.innerHTML = '';
  recreateUI()
}

clearAllBtn.addEventListener('click', () => {
  localStorage.removeItem('dogs')
  const savedDogsContainer = document.querySelector('.saved-dogs-container')
  savedDogsContainer.innerHTML = '';
})

wonderfulPetBtn
  .addEventListener('click', onWonderfulBtnClick)

saveButton.addEventListener('click', onSaveBtnClick)
recreateUI()