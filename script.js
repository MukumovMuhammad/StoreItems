window.addEventListener("DOMContentLoaded", () => {
    let Goods = document.getElementsByClassName("Goods");
    let search_inp = document.getElementById("search_input");
    let add_btn = document.getElementById("add_btn");
    let L_Data = [];
    let Products = [];

    // AddModal
    let Add_modal = document.getElementsByClassName("Modal");
    let cancel_btn = document.getElementById("cancel");
    let create_btn = document.getElementById("create");
    // InfoModal
    let InfoModal = document.getElementsByClassName("InfoModal");
    let Back_btn = document.getElementById('back');
    let info_m_name = document.getElementById('p_m_name');
    let info_m_price = document.getElementById('p_m_price');
    let delete_btn = document.getElementById("delete-button");









    const AddItem = () => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log("------------------");
                L_Data = data;
                console.log(L_Data);

                Goods[0].innerHTML = '';
                L_Data.forEach((good, i) => {
                    Goods[0].innerHTML += `<div class="Product" id="${i}">
                <div>
                <h1 class="product_name">${good.name}</h1>
                <h3 class="product_price">${good.price}</h3>
                </div>

                <div class="detail-info">
                    <p> <span>Позиция: </span> ${good.pos}</p>
                    <p> <span>Качесво: </span> ${good.quality}</p>
                </div>
            </div>`
                });


                Products = Array.from(document.querySelectorAll('.Product'));

                Products.forEach(product => {

                    product.addEventListener('click', () => {

                        MoreInfo(product.id);
                    })
                })



            })
            .catch(error => console.error(error));
    }


    AddItem();










    const OpenModal = () => {
        console.log("Open");
        Add_modal[0].style.display = "block";
    }

    const CloseModal = () => {
        console.log("Close");
        Add_modal[0].style.display = "none";
    }



    add_btn.addEventListener("click", () => {
        OpenModal();
    })

    cancel_btn.addEventListener("click", () => {
        CloseModal();
    })

    Back_btn.addEventListener('click', () => {
        InfoModal[0].style.display = 'none';
    })



    create_btn.addEventListener("click", (e) => {
        e.preventDefault();
        let m_name = document.getElementById("name").value;
        let m_price = document.getElementById("price").value;
        let m_pos = document.getElementById("pos").value;
        let m_quality = document.getElementById("quality").value;
        console.log("Was clicked")
        if (!m_name || !m_pos || !m_price || !m_quality) return;
        console.log("Full");

        fetch('/addGood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: m_name,
                price: m_price,
                pos: m_pos,
                quality: m_quality
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data was send");
                AddItem();
                CloseModal();
            })
            .catch(error => console.error(error));

        document.getElementById("name").value = '';
        document.getElementById("price").value = '';
        document.getElementById("pos").value = '';
        document.getElementById("quality").value = '';

    })

    search_inp.onkeyup = async function () {

        let inp_value = search(L_Data, search_inp.value);

        Goods[0].innerHTML = '';
        L_Data.forEach((good, i) => {
            if (inp_value.includes(good)) {
                Goods[0].innerHTML += `<div class="Product" id="${i}">
                <div>
                <h1 class="product_name">${good.name}</h1>
                <h3 class="product_price">${good.price}</h3>
                </div>

                <div class="detail-info">
                    <p> <span>Позиция: </span> ${good.pos}</p>
                    <p> <span>Качесво: </span> ${good.quality}</p>
                </div>
            </div>`
            }

            Products = Array.from(document.querySelectorAll('.Product'));

            Products.forEach(product => {

                product.addEventListener('click', () => {
                    MoreInfo(product.id);
                })
            })

        });
    }


    // Search Function
    function search(source, name) {
        var results = [];
        var index;
        var entry;

        name = name.toUpperCase();
        for (index = 0; index < source.length; ++index) {
            entry = source[index];
            if (entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1) {
                results.push(entry);
            }
        }

        return results;
    }



    const MoreInfo = (id) => {
        InfoModal[0].style.display = 'block';
        info_m_name.innerText = L_Data[id].name;
        info_m_price.innerText = `${L_Data[id].price}`;

        console.log(id);
        // Delete button

        delete_btn.addEventListener("click", () => {
            info_m_name.innerText = '';
            info_m_price.innerText = '';
            InfoModal[0].style.display = 'none';
            fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    d_id: id
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response: ', data);
                    location.reload();
                })
                .catch(err => { console.log('Error: ', err) })
        });
    }
});