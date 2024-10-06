// categories
const loadCategories = () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log('errored'))
};

const displayCategory = (data) => {
    const categoryContainer = document.getElementById('categories')
 data.forEach((item) =>{
    const buttonContainer =document.createElement("div");
   buttonContainer.innerHTML=
   `
   <button class="btn btn-lg px-16" id="${item.category}" onclick="loadPetsByCategory (${item.category})">
 <img class="w-8  " src="${item.category_icon}">
 ${item.category}
   </button>
   `
    categoryContainer.append(buttonContainer);
    
 })
};

// load pets by category
const loadPetsByCategory = (id)=>{
  
   
};


// all pets
const loadPets= () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) =>displayLoadPets(data.pets))
    .catch((error) => console.log('errored'))
}
const displayLoadPets = (pet) =>{
   const petsContainer = document.getElementById('all-pets');
   pet.forEach((item) => {
    const div = document.createElement('div');
    div.classList="flex"
    div.innerHTML=`
   <div class="grid grid-cols-4">
   <div class="card card-compact ">
  <figure class="w-[300px] h-[300px]">
    <img class="w-full h-full object-cover" src=${item.image} />
  </figure>
  <div>
    <div class="flex gap-2 items-center">
    <i class="fa-solid fa-border-all"></i>
    <p>Breed: ${item.breed?.length==0? "Undefined" : `${item.breed}`}</p>
    </div>
    
    <div class="flex gap-2">
    <i class="fa-regular fa-calendar"></i>
     <p>Birth: ${item.date_of_birth?.length==0? "Undefined" : `${item.date_of_birth}`}</p>
    </div>

     <div class="flex gap-2">
   <i class="fa-solid fa-mercury"></i>
     <p>Birth: ${item.date_of_birth?.length==0? "Undefined" : `${item.date_of_birth}`}</p>
    </div>

     <div class="flex gap-2">
    <i class="fa-solid fa-dollar-sign"></i>
     <p>Price: ${item.price?.length==0? "Undefined" : `${item.price}`}</p>
    </div>

   </div>
   <div>
   <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
   <button class="btn">Adopt</button>
   <button class="btn">Details</button>
   </div>
  

</div>
   </div>

   <div class="w-1/4 bg-black">
   </div>

    `
    petsContainer.append(div)
   })
};

loadCategories();
loadPets();
loadPetsByCategory();
