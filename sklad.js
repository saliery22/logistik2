

let TOKEN = '4d2e59443e9e64c89c5725f14c042fbd3D91C94CFE94B0EDAD6EAEC75C6C8F4A428020D3';
let data=[];
let ftp_id = 601000441; 




// execute when DOM ready
$(document).ready(function () {
  wialon.core.Session.getInstance().initSession("https://hst-api.wialon.eu",null,0x800);
  wialon.core.Session.getInstance().loginToken(TOKEN, "", 
    function (code) { 
      if (code){ alert(wialon.core.Errors.getErrorText(code)); return; }

 

let option = 0;
setInterval(function() {
update_jurnal(ftp_id,'Options.txt',function (size) { 
  if(option<size){
    $('#table').empty();
    load_jurnal(ftp_id,'Options.txt',function (data) { 
     for (i = 1; i < data.length; i++){
      let m = data[i].split('|');
      let d =new Date(parseInt(m[0])).toLocaleString("uk-UA", {year:'numeric',month:'numeric',day:'numeric',hour:'numeric', minute: 'numeric', second: 'numeric'});
    $("#table").append("<tr><td>"+i+"</td><td>"+d+"</td><td>"+m[1]+"</td><td><button>надходження</button>&nbsp;&nbsp;&nbsp;<button>видаток</button>&nbsp;&nbsp;&nbsp;<button>видалити</button></td></tr>");
     }
    });
    option=size;
  }
});
 }, 2000);
   
    });
  });

function write_jurnal(id,file_name,content,calbek){
  let remotee= wialon.core.Remote.getInstance(); 
  remotee.remoteCall('file/write',{'itemId':id,'storageType':1,'path':'//sklad/'+file_name,"content":content,"writeType":1,'contentType':0},function (error) {
    if (error) {msg(wialon.core.Errors.getErrorText(error));
    return;
    }else{
    audio.play();
    alert(wialon.core.Errors.getErrorText(error));
    calbek();
    return;
   }
}); 
}
function rewrite_jurnal(id,file_name,content,calbek){
  let remotee= wialon.core.Remote.getInstance(); 
  remotee.remoteCall('file/write',{'itemId':id,'storageType':1,'path':'//sklad/'+file_name,"content":content,"writeType":0,'contentType':0},function (error) {
    if (error) {
    alert(wialon.core.Errors.getErrorText(error));
    return;
    }else{
     audio.play();
    calbek();
    return;
   }
}); 
}
function load_jurnal(id,file_name,calbek){
  let remotee= wialon.core.Remote.getInstance(); 
  let jurnal_data=[];
  remotee.remoteCall('file/read',{'itemId':id,'storageType':1,'path':'//sklad/'+file_name,'contentType':0},function (error,data) {
     if (error) {
      alert(wialon.core.Errors.getErrorText(error));
      return;
     }else{
      jurnal_data=data.content.split('||');
      calbek(jurnal_data);
      return;
    }
}); 
}
function update_jurnal(id,file_name,calbek){
  let remotee= wialon.core.Remote.getInstance(); 
  remotee.remoteCall('file/list',{'itemId':id,'storageType':1,'path':'/sklad/','mask':file_name,'recursive':false,'fullPath':false},function (error,data) { 
    if (error) {
     alert(wialon.core.Errors.getErrorText(error));
      return;
    }else{
      calbek(data[0].s);
     return;
    } 
});
}