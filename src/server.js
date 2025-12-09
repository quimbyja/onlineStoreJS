const express = require('express');
const app = express();
/*
Подключаем dotenv для использования файла .env в котором
будут храниться пароли от БД, порт сервета и т.д.
этой строкой мы даем доступ к переменным, соохраненым в ней
*/
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Распаковываем список который упаковали в файле Product
const {
    products,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require(`./models/Product`);

// Позволяет серверу понимать JSON запросы
app.use(express.json());

// проверяем, работает ли сервер, mainpage
app.get('/', (req, res) => {
    res.send(`Server is ok!`);
});

//получаем все товары
app.get('/api/products', (req, res) => {
    res.json(products);
});

//получаем товар по ID
app.get('/api/products/:id', (req,res) => {
    const product = findProductById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Can not find a cat'})
    }
    res.json(product)
})

//Создаем новый товар
app.post('/api/products', (req, res) => {
    const {
        name,
        price,
        description,
        imageURL
    } = req.body;

    //Валидация имени
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            error: 'Name shoulbe longer than 2 chars!'
        });
    }

    //Валидация цены
    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            error: 'Remember, price is always positive number!'
        });
    }
    //Валидация описания
    if (description && typeof description !== 'string') {
        return res.status(400).json({
            error: 'Description must be a string, honey ;)'
        })
    }

    //Валидация URL изображения
    if (imageURL && typeof imageURL !== 'string') {
        return res.status(400).json({
            error: 'URL of image must be a string <3'
        });
    }

    const newProduct = createProduct({
        name: name.trim(),
        price,
        description: description?.trim() || null,
        imageURL: imageURL?.trim() || null,
    });
    res.status(201).json(newProduct);
})

//Обновляем товар
app.put('/api/products/:id', (req, res) => {
    const product = findProductById(req.params.id);
    if (!product) {
        res.status(404).json({ error: 'Product not found' })
    }
    const {name, price, description, imageURL } = req.body;

    //Валидация названия
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            error: 'Name shoulbe longer than 2 chars!'
        });
    }

    //Валидация цены
    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            error: 'Remember, price is always positive number!'
        });
    }

    //Валидация описания
    if (description && typeof description !== 'string') {
        return res.status(400).json({
            error: 'Description must be a string, honey ;)'
        })
    }

    //Валидация URL изображения
    if (imageURL && typeof imageURL !== 'string') {
        return res.status(400).json({
            error: 'URL of image must be a string <3'
        });
    }

    //Обновление данных с очисткой данных
    const updatedProduct = updateProduct(
        req.params.id,
        {
            name: name.trim(),
            price,
            description: description?.trim() || null,
            imageURL: imageURL?.trim() || null
        }
    );
    res.json(updatedProduct)
})

//Удаляем товар
app.delete('/api/products/:id', (req, res) => {
    const success = deleteProduct(req.params.id);
    if (!success) {
        return res.status(404).json({ error: 'Object not found' });
    }
    res.status(204).send();
});

/*
Запускаем сервер и привязываем его к указанному порту () ->
функция, которая выполняется при успешном запуске сервера
*/
app.listen(PORT, () => {
    //вывод сообщения в терминал если все нормально
    console.log(`Run server at http://localhost:${PORT}`);
});

