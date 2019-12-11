

function doSomthing() {
    alert('this is a song about a whale!');
}

function getSubs() {
    //alert("why do you suck? " + mod)
    var title = document.getElementById("sumid").innerHTML;
    var listItems = document.getElementsByTagName("a");
    var listItem;
    for (item in listItems) {
        if (listItems[item].innerText === title) {
            listItem = listItems[item];
        }
    }
    listItem.style.fontWeight = "800";
    listItem.style.color = "blue";
}