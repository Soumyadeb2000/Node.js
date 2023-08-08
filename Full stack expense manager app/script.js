function saveExpenses(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const obj = {
        amount,
        description,
        category
    };
    axios.post("http://localhost:3000/user/add-expense", obj)
    .then(res => {
        console.log(res);
        showOnScreen(res.data.newExpenseData)
    })
    .catch(err => {
        console.log(err);
    })
}

function showOnScreen(data) {
    let parentElm = document.getElementById('list-group');
    let childElm = document.createElement('li')
    childElm.textContent = data.amount + " - " + data.description + " - " + data.category;
    parentElm.appendChild(childElm);
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    childElm.appendChild(deleteBtn);
    deleteBtn.onclick = async () => {
       try {
            await axios.delete(`http://localhost:3000/user/delete-expense/${data.id}`)
            parentElm.removeChild(childElm);
       } catch (error) {
            console.log(error);
       }
    }
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';
    childElm.appendChild(editBtn);
    // editBtn.onclick = async () => {
    //     try {
    //         await axios.put(`http://localhost:3000/user/update-expense/${data.id}`);
    //         parentElm.removeChild(childElm);
    //         const amountElm = document.getElementById('amount');
    //         const descriptionElm = document.getElementById('description');
    //         const categoryElm = document.getElementById('category');
    //         amountElm.value = data.amount;
    //         descriptionElm.value = data.description;
    //         categoryElm.value = data.category;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let response = await axios.get('http://localhost:3000/user/get-expense');
        for(let i=0 ; i<response.data.expenses.length ; i++) {
            showOnScreen(response.data.expenses[i]);
        }
    } catch (error) {
        console.log(error);
    }
})