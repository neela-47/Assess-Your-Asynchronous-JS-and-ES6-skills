const loadCategories = () =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log('errored'))
};

const displayCategory = (data) => {
    const categoryContainer = document.getElementById('categories')
 data.forEach((item) =>{
    const button =document.createElement("button");
    button.classList="btn btn-lg";
    button.innerHTML= `
    <div class="flex justify-center items-center gap-3 px-16  ">
    <img class="w-8  " src="${item.category_icon}">
    <p>${item.category}</p>
    </div>
    `
   
    
    categoryContainer.append(button);
    
 })
};

loadCategories();
