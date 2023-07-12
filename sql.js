window.addEventListener("DOMContentLoaded", () => {
    let Goods = document.getElementsByClassName("Goods");
    let Add_modal = document.getElementsByClassName("Modal");
    let add_btn = document.getElementById("add_btn");
    let cancel_btn = document.getElementById("cancel");
    let create_btn = document.getElementById("create");
    let search_btn = document.getElementById("search_btn");
    let search_inp = document.getElementById("search_input");





    const AddItem = () => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                Goods[0].innerHTML = '';
                for (let good of data.Goods) {
                    Goods[0].innerHTML += `<div class="good">
                <div>
                <h1 class="product_name">${good.name}</h1>
                <h3 class="product_price">${good.price}c</h3>
                </div>

                <div class="detail-info">
                    <p> <span>Позиция: </span> ${good.pos}</p>
                    <p> <span>Качесво: </span> ${good.quality}</p>
                </div>
            </div>`

                }


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
                AddItem();
                CloseModal();
            })
            .catch(error => console.error(error));

    })

    search_inp.onkeyup = function () {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                let m_searched_Data = search(data.Goods, search_inp.value);

                Goods[0].innerHTML = '';
                for (let good of m_searched_Data) {
                    Goods[0].innerHTML += `<div class="good">
                <div>
                <h1 class="product_name">${good.name}</h1>
                <h3 class="product_price">${good.price}c</h3>
                </div>

                <div class="detail-info">
                    <p> <span>Позиция: </span> ${good.pos}</p>
                    <p> <span>Качесво: </span> ${good.quality}</p>
                </div>
            </div>`

                }


            })
            .catch(error => console.error(error));
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
})