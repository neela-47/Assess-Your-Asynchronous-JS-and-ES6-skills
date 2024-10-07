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
   <button onclick="loadPetsByCategory ('${item.category}')" class="btn btn-lg px-16" id="${item.category}" >
 <img class="w-8  " src="${item.category_icon}">
 ${item.category}
   </button>
   `
    categoryContainer.append(buttonContainer);
    
 })
};

// load pets by category
const loadPetsByCategory = (id)=>{
 alert(id)
  fetch(`https://openapi.programming-hero.com/api/peddy/${id}`)
  .then((res) => res.json())
  .then((data) =>console.log(data.data))
  .catch((error) => console.log('errored'))
   
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
   petsContainer.innerHTML="";
   pet.forEach((item) => {
    const div = document.createElement('div');
    div.classList=""
    div.innerHTML=`
   <div class="">
   <div class="card card-compact ">
  <figure class="w-[300px] h-[300px]">
    <img class="w-full h-full object-cover" src=${item.image} />
  </figure>
  <div class="mt-3">
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
     <p>Birth: ${item.gender?.length==0? "Undefined" : `${item.gender}`}</p>
    </div>

     <div class="flex gap-2">
    <i class="fa-solid fa-dollar-sign"></i>
     <p>Price: ${item.price?.length==0? "Undefined" : `${item.price}`}</p>
    </div>

   </div>
   <div class="my-4  ">
   <button class="btn text-[#0E7A81]"><i class="fa-solid fa-thumbs-up"></i></button>
   <button class="btn text-[#0E7A81]">Adopt</button>
   <button onclick=loadPetDetails("${item.petId}") class="btn text-[#0E7A81]">Details</button>
   </div>
  

</div>
  

    `
    petsContainer.append(div)
   })
};
// pet details by petId
const loadPetDetails = async(pet) => {
  console.log(pet)
  const uri=`https://openapi.programming-hero.com/api/peddy/pet/${pet}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetDetails(data.petData);
}
const displayPetDetails = (detail) =>{
console.log(detail)
const detailContainer = getElementById('modal-content')

// document.getElementById("showModalData").click();
document.getElementById("customModal").showModal();
}

loadCategories();
loadPets();

