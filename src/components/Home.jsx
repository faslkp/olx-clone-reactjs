import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import db from "../Firebase/config";
import { useEffect, useState } from "react";

function Home() {
    const [products, setProducts] = useState([])
    const [updated, setUpdated] = useState(false)

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)

    const [editId, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editCategory, setEditCategory] = useState('')
    const [editPrice, setEditPrice] = useState(0)

    const addProduct = async () => {
        try {
            if (name.trim() != '' && category.trim() != '' && price > 0) {
                let newDoc = await addDoc(collection(db, 'products'), {
                    name: name,
                    category: category,
                    price: price
                })
                setName('')
                setCategory('')
                setPrice(0)
                setUpdated(false)
                console.log("Added doc with ID:", newDoc.id)
            } else {
                console.log("Enter valid details!");
            }
        } catch (e) {
            console.log("Error:", e);
        }
    }

    const editProduct = (id) => {
        try {
            const selectedProduct = products.filter((product) => product.id == id)
            if (selectedProduct.length != 0) {
                setEditId(selectedProduct[0].id)
                setEditName(selectedProduct[0].name)
                setEditCategory(selectedProduct[0].category)
                setEditPrice(selectedProduct[0].price)
            }
        } catch (e) {
            console.log("Error:", e);
        }
    }

    const updateProduct = async (id) => {
        try {
            if (editId != '') {
                const productToUpdate = doc(db, 'products', id);
                await updateDoc(productToUpdate, {
                    name: editName,
                    category: editCategory,
                    price: editPrice
                })
                setEditId('')
                setEditName('')
                setEditCategory('')
                setEditPrice(0)
                setUpdated(false)
            } else {
                console.log("No item selected!");
            }
            
        } catch (e) {
            console.log("Error:", e);
        }
    }

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id))
        setUpdated(false)
    }

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'products');
            const productsSnapshot = await getDocs(productsCollection)
            const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id, ...doc.data()
                }))
            
            setProducts(productsList);
            setUpdated(true)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        };

        fetchProducts();
    }, [updated])
    return (
        <>
            <div style={{display: "flex", gap: 20}}>
                <div>
                    <div>Products</div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button onClick={() => editProduct(product.id)}>Edit</button>
                                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="form">
                    <h3>Add Form</h3>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" name="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value && e.target.value >= 0 ? e.target.value : 0))} />
                    <button onClick={() => addProduct()}>Submit</button>
                </div>
            </div>
            <div className="editForm">
                <h3>Edit Form</h3>
                <input type="text" name="name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="text" name="category" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                <input type="text" name="price" value={editPrice} onChange={(e) => setEditPrice(parseFloat(e.target.value && e.target.value >= 0 ? e.target.value : 0))} />
                <button onClick={() => updateProduct(editId)}>Submit</button>
            </div>
        </>
    );
}

export default Home;
