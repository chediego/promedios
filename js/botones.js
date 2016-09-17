var contador_notas = 1;
/*  var agregar = function () {
  contador_notas++;
  var aux = '<p><span class="input-group-addon">nota'+contador_notas+'</span>'+'<input id="nota'+contador_notas+' "type="text" class="form-control"></p>'
  document.getElementById('notasdiv').innerHTML   += aux;
  var parent = document.getElementById('notasdiv').parentNode;
  var node = 'nota'+ contador_notas;
  document.getElementById('notasdiv').appendChild(node);
  //var nota1 = document.getElementById('nota1').value;
  //console.log(nota1);

}
*/
var addElement = function () {
  contador_notas++;
  //agega nota
  var ni = document.getElementById('notasdiv');

  var newdiv = document.createElement('input');
  var newspan = document.createElement('span');
  var newp = document.createElement('p');

  var newname = 'notas'+contador_notas;

  newspan.setAttribute('class','input-group-addon');
  newspan.setAttribute('id',newname);
  newspan.innerHTML = 'nota'+contador_notas;

  var divIdName = 'nota'+contador_notas;

  newdiv.setAttribute('id',divIdName);
  newdiv.setAttribute('type','text');
  newdiv.setAttribute('class','form-control');

  newp.setAttribute('id',contador_notas);
  ni.appendChild(newp);

  var ni2 = document.getElementById(contador_notas);
  ni2.appendChild(newspan);
  ni2.appendChild(newdiv);
  //agrega porcentaje



}



var removeElement = function () {
  if (contador_notas === 0) {
    window.alert("no quedan notas para eliminar.");
  }
  else {
    var aux = 'nota' + contador_notas;
    var elem = document.getElementById('notasdiv');
    var oldp = document.getElementById(contador_notas);
    elem.removeChild(oldp);
    contador_notas--;
  }
}

var get_nota = function(pos){
  var aux = 'nota' + pos;
  return Number(document.getElementById(aux).value);
}

var promedio = function () {
  var sumatoria = 0;
  for (var i = 1; i <= contador_notas ; i++) {
    sumatoria += get_nota(i);
  }
  var result = sumatoria/contador_notas;
  return result;
}

var show_avrg = function () {
    var result = promedio();
    if (result >= 4) {
      //aprove
      var parent = document.getElementById('main');
      var newnotify = document.createElement('div');
      newnotify.setAttribute('class','alert alert-success');
      newnotify.setAttribute('role','alert');
      var message = 'Pasaste el ramo con ' + result;
      newnotify.innerHTML = message;
      parent.appendChild(newnotify);

    }
    else {
      var parent = document.getElementById('main');
      var newnotify = document.createElement('div');
      newnotify.setAttribute('class','alert alert-danger');
      newnotify.setAttribute('role','alert');
      var message = 'No pasaste :( tu nota fue ' + result;
      newnotify.innerHTML = message;

      parent.appendChild(newnotify);

    }
  }
