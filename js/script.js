var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var address = document.getElementById("address");
var hobby = document.getElementById("hobby");

var alert = document.querySelector(".alert");

var tableList = document.getElementById("tableList");

var addItemBtn = document.getElementById("add");

// array to save data from inputs
var items = [];

// get data from local storage and show data
if (localStorage.getItem("items") == null) {
    items = [];
} else {
    items = JSON.parse(localStorage.getItem("items"));
    showData();
}

// add data to array 
addItemBtn.addEventListener("click", function() {
    if (fName.value == "" || lName.value == "" || email.value == "") {
        alert.innerHTML = `<div class="alert alert-danger" role="alert">
            <div class="text-center"> 
                Please Fill all inputs
            </div>
        </div>`;
    } else {
        alert.innerHTML = `<div class="alert alert-success" role="alert">
            <div class="text-center"> 
            Added successfully
            </div>
        </div>`;
        var item = {
            fName: fName.value,
            lName: lName.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            hobby: hobby.value
        }

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));

        showData();
        clearInputs();
    }
});

// show data in tables

function showData() {
    var container = "";
    for (var i = 0; i < items.length; i++) {
        container += `<tr>
        <td>${i + 1}</td>
        <td>${items[i].fName}</td>
        <td>${items[i].lName}</td>
        <td>${items[i].email}</td>
        <td>${items[i].phone}</td>
        <td>${items[i].address}</td>
        <td>${items[i].hobby}</td>
        <td>
            <button onclick="" class="btn btn-warning btn-sm edit ">Edit</button>
            <button onclick="deleteBtn(${i})" class="btn btn-danger btn-sm delete ">Delete</button>
        </td>
    </tr>`;
    }

    document.getElementById("tableList").innerHTML = container;
};

// clear inputs after press on btn
function clearInputs() {
    fName.value;
    lName.value = "";
    email.value = "";
    phone.value = "";
    address.value = "";
    hobby.value = "";
}

// function delete row from table 
function deleteBtn(i) {
    items.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(items));
    showData();
};

// download tables as csv
function toCsv(table) {
    const rows = table.querySelectorAll('tr');

    return [].slice
        .call(rows)
        .map(function(row) {
            // Query all cells
            const cells = row.querySelectorAll('th,td');
            return [].slice
                .call(cells)
                .map(function(cell) {
                    return cell.textContent;
                })
                .join(',');
        })
        .join('\n');
};

const table = document.querySelector('.table');

function download(text, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
    link.setAttribute('download', fileName);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
};

function downloadBtn() {
    csv = toCsv(table);
    download(csv, 'download.csv');
};