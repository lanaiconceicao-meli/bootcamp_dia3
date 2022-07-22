const express = require("express");
let products = require("./products");

const app = express();
app.use(express.json());

// 1-POST para adicionar 4 produtos, de uma vez.
app.post("/products", (req, res) => {
    const content = req.body;
    
    const newProduct = [...products, ...content];

    res.status(201).json(newProduct);
});

// 2-PUT para modificar um desses produtos.
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const content = req.body;

  const newProduct = products.map((item) => {
    if(item.id === id) {
        return content;
    }
    return item;
  });

  return res.status(200).json(newProduct);

});

// 3-DELETE para deletar um desses produtos.
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((item) => {
      item.id === id;
    });
  
    if(!product) {
      return res.status(400).json({ "message": "Produto não encontrado" });
    }

    deletedProduct = products.filter((item) => {
      item.id !== id;
    });
  
    return res.status(200).json(deletedProduct);
});

// 4-GET para verificar os que foram mantidos.
app.get("/", (_req, res) => {
    res.status(200).json(products);
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});