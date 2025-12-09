/*
Создаем некий шаблон для карточек товара
*/
class Product {
    constructor(id, name, price, description, imageURL = null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
    }
}
/*
Создаем некий список товаров,
let products = [
    new Product(1, 'котик', 15000),
    new Product(2, 'котятки', 20000)
];
дня начала  списками, потом оптимизирую,
чтобы их можно юбыло добавлять на сайте,
мыслю что через цикл как-то, разберусь.
13:10 81225
*/
let products = [
    new Product(
        1, 'котик', 15000, 'мявкает', 'рыжий', 'мальчик'
    ),
    new Product(
        2, 'котятки', 20000, 'мурчат', 'беленькие', 'девочки'
    )
];

/*
function findProductById(id) {
    return products.find(function(p) {
        if (p.id ===parseInt(id)) {
            return p;
        }
    });
}
функция выглядит громоздко, вариант ниже выглядит проще
в плане того, что читается удобнее,
но стоит разобрать тему стрелочных функций!
13:56 81225
*/
const findProductById = (id) => products.find(p => p.id === parseInt(id));

//Создаем функция для добавления товара
function createProduct(data) {
    const newProduct = new Product(
        products.length + 1,
        data.name,
        data.price,
        data.description,
        data.imageURL
    );
    products.push(newProduct);
    return newProduct
}

//Создаем функцию которая отвечает за редактирование товара
function updateProduct(id, data) {
    const product = findProductById(id);
    if (!product) return null;

    product.name = data.name;
    product.price = data.price;
    product.description = data.description;
    product.imageURL = data.imageURL;
    return product;
}
//Создаем функцию для удаления продукта
function deleteProduct(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    products.splice(index, 1)
    return true;
};


/*
Упаковываем карточки товаров и списки в модуль для экспорта
так другие части программы могут их увидеть
как я понял без этой строки сервер их не увидит,
будем разбираться на практике :)
--------------
Ага теперь разобрался мы прописываем логику действий
с товарами тут, а потом экспортируем ее, чтобы можно
этим всем пользоваться 0_0
14:28 81225
*/
module.exports = {
    Product,
    products,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};