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

    //get Data from json
    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`error status : ${res.status}`);
        }

        return await res.json();
    }

    //get data from server and create and append every menu item on page, we can use destructuring of object(order doesnt matter)
    getData('data.json')
        .then(data => data.menu.forEach(({
            category,
            title,
            price,
            img,
            desc
        }) => {
            //dynamically append with render() method from our class
            new MenuItem(title, category, price, img, desc, '.menu__items').render();
        }));



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
            //we need to get only unique categories from our data array, so we wont get something like this on page  Breakfast Dinner Milkshake Lunch Breakfast Milkshake Lunch Breakfast Milkshake Lunch
            //thats why we use Set to get only unique items

            //get categories from data 
            const categories = data.menu.map(item => {
                return item.category;
            })
            console.log(categories);
            categories.unshift('All')
            //filter for unique categories
            const uniqueCategories = new Set(categories);
            console.log(uniqueCategories)

            //now we can create and apped unique filter buttons to page
            uniqueCategories.forEach(item => {
                new FilterBtn(item, ".menu__categories").render();
            })

            
        })



    //Filter buttons interactive



})