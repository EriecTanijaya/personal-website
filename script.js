/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

window.onload = function(){
  //do nothing
};

function toggle(){
  if (document.body.id === "dark"){
    document.body.style.background = '#D3D3D3';
    document.body.style.color = "#000000";
    document.body.id = "white";
    
    let obj_switch = document.getElementById("switch");
    obj_switch.value = "TUTUP LAMPU";
    
    let obj_header_status = document.getElementById("h1Status");
    obj_header_status.innerHTML = "Silau Men";
    
    let obj_p_status = document.getElementById("pStatus");
    obj_p_status.innerHTML = "Tutup lampunya lah";
    
  } else if (document.body.id === "white"){
    document.body.style.background = '#173145';
    document.body.style.color = "#5e97f6";
    document.body.id = "dark";
    let obj_switch = document.getElementById("switch");
    obj_switch.value = "BUKA LAMPU";
    
    let obj_header_status = document.getElementById("h1Status");
    obj_header_status.innerHTML = "Gelap Cuk";
    
    let obj_p_status = document.getElementById("pStatus");
    obj_p_status.innerHTML = "nyalain lampunya dong";
    
  }
}
