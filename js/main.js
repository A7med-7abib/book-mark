var bookmarkName = document.getElementById("site_name")
var bookmarkURL = document.getElementById("url")
var sitelist = []
if(localStorage.getItem("sites") != null) {
    sitelist = JSON.parse(localStorage.getItem("sites"))
    display()
}
function add() {
    let siteName = bookmarkName.value.trim();
    let siteURL = bookmarkURL.value.trim();
    if (siteName.length < 3) {
        alert("Site name must contain at least 3 letters.");
        return; 
    }
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!urlPattern.test(siteURL)) {
        alert("Please enter a valid URL.");
        return; 
    }
    let mark = {
        siteName: bookmarkName.value,
        siteURL: bookmarkURL.value
    }
    sitelist.push(mark)
    display()
    bookmarkName.value = ''
    bookmarkURL.value = ''
    localStorage.setItem("sites",JSON.stringify(sitelist))
}
function display() {
    var cartona = ''
    for (var i = 0; i < sitelist.length; i++) {
        cartona += `
    <tr class="mt-3">
        <td>${i + 1}</td>
        <td>${sitelist[i].siteName}</td>
        <td><button class="btn btn-visit" onclick="visit('${sitelist[i].siteURL}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button class="btn btn-del" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
</tr>`
    }

    document.getElementById("content").innerHTML=cartona
}
function visit(url){
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    window.open(url,"_blank")
}
function deleteSite(index){
    sitelist.splice(index,1)
    display()
}