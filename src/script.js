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
        const res =  await fetch(url);

        if (!res.ok) {
            throw new Error(`error status : ${res.status}`);
        }

        return await res.json();
    }

    //get data from server and create and append every menu item on page, we can use destructuring of object(order doesnt matter)
    getData('data.json')
    .then(data => data.menu.forEach(({category,title,price,img, desc}) => {
        //dynamically append with render() method from our class
        new MenuItem(title,category,price,img,desc,'.menu__items').render();
    }));

})