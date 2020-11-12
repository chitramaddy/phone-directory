var cnt = 0;

// Filter based on phone number
const textBox = document.getElementById('search');
textBox.addEventListener("keyup", function(e) {
    var filter, table, tr, td, i, txtValue, counter = 0;
    filter = textBox.value;
    table = document.getElementById("summaryTable");
    table.removeChild(document.getElementsByTagName('tbody')[0]);
    var body = table.createTBody();

    for (const property in contactsList) {
        console.log(`${property}: ${contactsList[property].name}`);
        if (contactsList[property].mobile.indexOf(filter) > -1) {
            var row = body.insertRow();
            if (counter % 2 != 0) {
                row.classList.add('nth-child(odd)');
            }
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = contactsList[property].name;
            cell2.innerHTML = contactsList[property].mobile;
            cell3.innerHTML = contactsList[property].email;
            counter++;
        }
    }
    if (counter == 0) {
        document.getElementById("noResult").classList.remove("dn");
    } else {
        document.getElementById("noResult").classList.add("dn");
    }
});

// Sorting of table
var order = false;
const tableHeader = document.getElementById('nameColumn');
tableHeader.addEventListener("click", function(e) {
    order = !order;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("summaryTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            // Check if the two rows should switch place:
            if (order ? x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() : x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
});

///listener submit click
const button = document.getElementById('submit');
button.addEventListener('click', function(e) {
    var name = document.getElementById('name');
    var mobile = document.getElementById('mobile');
    var email = document.getElementById('email');
    var error = document.getElementById("error");
    if (name.value == '' || mobile.value == '' || email.value == '') {
        error.classList.remove('dn');
        return;
    }
    var nameRegEx = /^[a-zA-Z\s]+$/;
    if (!nameRegEx.test(name.value) || name.value.length > 20) {
        error.classList.remove('dn');
        return;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.value) || email.value.length > 40) {
        error.classList.remove('dn');
        return;
    }
    var numRegEx = /^\d*\.?\d*$/;
    if (!numRegEx.test(mobile.value) || mobile.value.length != 10) {
        error.classList.remove('dn');
        return;
    }
    var newRec = {
        "name": name.value,
        "mobile": mobile.value,
        "email": email.value
    };
    contactsList.push(newRec);
    cnt++;
    error.classList.add("dn");
    const table = document.getElementById("summaryTable");
    var row = table.insertRow();
    if (cnt % 2 != 0) {
        row.classList.add('nth-child(odd)');
    }
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = name.value;
    cell2.innerHTML = mobile.value;
    cell3.innerHTML = email.value;

    name.value = '';
    mobile.value = '';
    email.value = '';
});