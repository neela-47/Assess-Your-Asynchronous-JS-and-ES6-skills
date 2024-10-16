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
   <div class=" ">
   <div>
   <button id="id-${item.category}" onclick="changeColor(event),loadPetsByCategory('${item.category}')" class="btn btn-lg lg:px-16 md:px-16 px-10 btn-category " id="${item.category}" >
 <img class="w-8 category-btn" src="${item.category_icon}" >
 ${item.category}
   </button>
   </div>
   </div>
   `
    categoryContainer.append(buttonContainer);
    
 })
};

// active button;
function changeColor(event) {
  
const buttons = document.querySelectorAll('.btn-category');
// Reset all buttons to default background
  buttons.forEach(button => {
    button.classList.remove('active-btn');
    button.classList.add('bg-gray-200');
    
  });

  // Set the clicked button's background to green
  const clickedButton = event.target;
  clickedButton.classList.remove('bg-gray-200');
  clickedButton.classList.add('active-btn'); 
}


// load pets by category
const loadPetsByCategory = (id)=>{
  const loader = document.getElementById('loadingSpinner');
  loader.classList.remove("hidden")
   fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    setTimeout(function(){    
      loader.classList.add("hidden")
      displayLoadPets(data.data)
    }, 3000);
    })
  .catch((error) => console.log('errored'))
};
// loadPetsByCategory();

// all pets
const loadPets= () =>{
  const loader = document.getElementById('loadingSpinner');
  loader.classList.remove("hidden");
     fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) =>{
      setTimeout(function(){
        loader.classList.add("hidden");
        displayLoadPets(data.pets);
      }, 3000);
      
      })
    .catch((error) => console.log('errored'))
}
const displayLoadPets = (pet) =>{
const petsContainer = document.getElementById('all-pets');
 petsContainer.innerHTML="";
const notFoundContainer = document.getElementById('not-found');

   if(pet.length==0)
    {
      petsContainer.classList.remove("grid");
      petsContainer.classList.add('hidden');
      notFoundContainer.classList.remove("hidden");
      return;
    }
    else{
        petsContainer.classList.add("grid");
        petsContainer.classList.remove("hidden");
        notFoundContainer.classList.add("hidden");
       
    }
   pet.forEach((item) => {
    const div = document.createElement('div');
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
     <p>Gender: ${item.gender?.length==0? "Undefined" : `${item.gender}`}</p>
    </div>
   <div class="flex gap-2">
    <i class="fa-solid fa-dollar-sign"></i>
     <p>Price: ${item.price?.length==0? "Undefined" : `${item.price}`}</p>
    </div>
    </div>

   <div class="my-4  ">
   <button onclick= "showLikedPhoto('${item.image}')" id="id-${item.image}" class="btn text-[#0E7A81]"><i class="fa-solid fa-thumbs-up"></i></button>
   <button id="adopted-${item.petId}" onclick="addCountDown(), loadAdoptModal(),changeText(${item.petId})" class="btn text-[#0E7A81]">Adopt</button>
   <button onclick=loadPetDetails("${item.petId}") class="btn text-[#0E7A81]">Details</button>
   </div>
  

</div>
`;
petsContainer.append(div);
 })
};

//like button
 const showLikedPhoto = (image) =>{
  console.log(image);
  const showLikedPhotoContainer = document.getElementById('liked-photo')
  const div = document.createElement("div");
  div.innerHTML=`
  <img src=${image}/>
  `;
    showLikedPhotoContainer.append(div);
   
  
 
}

//adopt modal
const loadAdoptModal = () =>{
 const adoptModuleContainer = document.getElementById('adoptDetail');
  adoptModuleContainer.innerHTML=`
 <div class="text-center">
  <img class="pl-40" src=${'https://img.icons8.com/?size=100&id=PEmFcgjhBgKF&format=png&color=000000'}>
  <p>Adoption Process is start for your pet.</p>
  <div id="time" class="font-bold text-[1.5rem]"></div>
 </div>
  `;
document.getElementById("adoptModal").click();

}
// adopt modal innerText
const changeText =(id) => {
 
  const changeTextContainer = document.getElementById(`adopted-${id}`);
  console.log(changeTextContainer)
  changeTextContainer.innerText="Adopted"
}
// count down
const addCountDown = () =>{
  console.log("counting");
  let count = 4;
  const interval = setInterval(() => {
    count--;
    document.getElementById('time').innerText=`${count}`;
    if(count < 1){
      count++;
      document.getElementById('time').innerText=`${count}`;
      my_modal_5.close();
      clearInterval(interval);
    }
  }, 1000);
}



// pet modal details by petId
const loadPetDetails = async(pet) => {
  console.log(pet)
  const uri=`https://openapi.programming-hero.com/api/peddy/pet/${pet}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetDetails(data.petData);
}
const displayPetDetails = (detail) =>{
console.log(detail)
const detailContainer = document.getElementById('modal-content')
detailContainer.innerHTML=`
<img  src=${detail.image}>
<div class=" mt-4 grid  grid-cols-2 gap-4">
    <div class="flex gap-2 items-center">
    <i class="fa-solid fa-border-all"></i>
    <p>Breed: ${detail.breed?.length==0? "Undefined" : `${detail.breed}`}</p>
    </div>
    
    <div class="flex gap-2">
    <i class="fa-regular fa-calendar"></i>
     <p>Birth: ${detail.date_of_birth?.length==0? "Undefined" : `${detail.date_of_birth}`}</p>
    </div>

     <div class="flex gap-2">
   <i class="fa-solid fa-mercury"></i>
     <p>Gender: ${detail.gender?.length==0? "Undefined" : `${detail.gender}`}</p>
    </div>

     <div class="flex gap-2">
    <i class="fa-solid fa-dollar-sign"></i>
     <p>Price: ${detail.price?.length==0? "Undefined" : `${detail.price}`}</p>
    </div>

     <div class="flex gap-2">
   <i class="fa-solid fa-mercury"></i>
     <p>Vaccinated Status: ${detail.vaccinated_status?.length==0? "Undefined" : `${detail.vaccinated_status}`}</p>
    </div>

     <div class="flex gap-2">
   <i class="fa-solid fa-paw"></i>
     <p>Pet Name: ${detail.pet_name?.length==0? "Undefined" : `${detail.pet_name}`}</p>
    </div>
    </div>
    
    <div class="mt-5 w-full">
    <h1 class="font-bold mb-2">Details Information</h1>
    <p>${detail.pet_details}</p>
    </div>
`;
document.getElementById("customModal").showModal();

}
loadCategories();
loadPets();

