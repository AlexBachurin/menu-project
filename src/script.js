//get Data from json
const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`error status : ${res.status}`);
    }

    return await res.json();
}


window.addEventListener('DOMContentLoaded', () => {

    //class for dynamically creation of MENU ITEMS

    class MenuItem {
        constructor(title, category, price, src, text, parentSelector) {
            this.title = title;
            this.category = category;
            this.price = price;
            this.src = src;
            this.text = text;
            this.parent = document.querySelector(parentSelector)
        }
        //add to html
        render() {
            const item = document.createElement('div');
            item.classList.add('menu__item');

            item.innerHTML = `
                <div class="menu__img-container">
                    <img src="${this.src}"
                        alt="${this.title}" class="menu__img">
                </div>
                <div class="menu__item-descr">
                    <div class="menu__item-header">
                        <h3 class="menu__item-title">${this.title}</h3>
                        <span class="menu__item-price">$${this.price}</span>
                    </div>
                    <div class="menu__item-text">
                        ${this.text}
                    </div>
                </div>
                `

            //append to parent
            this.parent.append(item);
        }
    }

    
    //initizialize page

    
    getData('data.json')
    .then(data => {
        displayItems(data.menu);
    })



    //Filter buttons

    //class for filter btns
    class FilterBtn {
        constructor(category, parentSelector) {
            this.category = category;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const btn = document.createElement('div');

            btn.innerHTML = `
                <button data-category= ${this.category} class="menu__filter">${this.category}</button>
            `;

            this.parent.append(btn);
        }
    }

    //get data and append on page
    getData('data.json')
        .then(data => {
            //we need to get only unique categories from our data array, so we wont get something like this on page : Breakfast Dinner Milkshake Lunch Breakfast Milkshake Lunch Breakfast Milkshake Lunch
            //thats why we use Set to get only unique items

            //get categories from data 
            const categories = data.menu.map(item => {
                return item.category;
            })
            //add All category
            categories.unshift('All')
            //filter for unique categories
            const uniqueCategories = new Set(categories);

            //now we can create and apped unique filter buttons to page
            uniqueCategories.forEach(item => {
                new FilterBtn(item, ".menu__categories").render();
            })

            //add event listeners to this buttons
            const filterBtns = document.querySelectorAll('.menu__filter');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    //get dataset from category it will be like "breakfast" "lunch" etc.
                    const category = e.target.dataset.category;
                    //if category is "All" then show all items
                    if (category === 'All') {
                        displayItems(data.menu);
                    } else {
                        //else we filter data array depending on which button we clicked(ex. we clicked on "lunch", then category will be lunch, so we filter our data array and it will have 3 element)
                        const categoryArr = data.menu.filter(item => {
                            return item.category === category;
                        })
                        //and display this on page
                        displayItems(categoryArr);
                    }

                    

                   
                    
                })
            })
        })


    //function helper to display menu items on fliter button click

    function displayItems(arr) {
        //first get all menu items from page and remove them
        const menuItems = document.querySelectorAll('.menu__item');
        menuItems.forEach(item => {
            item.remove();
        })

        //then iterate through passed array and show new menu items from passed filtered array
        arr.forEach(({title,category,img,desc,price}) => {
            new MenuItem(title,category,price,img,desc,'.menu__items').render();
        })
    }

    


})