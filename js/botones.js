var contador_notas = 1;
var contador_notificaciones = 0 ;
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
var check_Notify = function(){
  if (contador_notificaciones > 0) {
    var top = document.getElementById('notificaciones');
    var notify = document.getElementById('notificacion1');
    var basura = top.removeChild(notify);
    contador_notificaciones = 0;
  }
  else {
    console.log('no hay notifiaciones');
  }
}
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

  var divpor = document.getElementById('porcentajesdiv');

  var newdivprc = document.createElement('input');
  var newspanprc = document.createElement('span');
  var newpprc = document.createElement('p');

  var newnameprc = 'porcentajes' + contador_notas;

  newspanprc.setAttribute('class','input-group-addon');
  newspanprc.setAttribute('id',newnameprc);
  newspanprc.innerHTML = 'porcentaje '+ contador_notas;

  var divIdNameprc = 'porcentaje'+contador_notas;

  newdivprc.setAttribute('id',divIdNameprc);
  newdivprc.setAttribute('type','text');
  newdivprc.setAttribute('class','form-control');
  var auxiname = 'p' + contador_notas;
  newpprc.setAttribute('id',auxiname);
  divpor.appendChild(newpprc);

  var auxi = document.getElementById(auxiname);
  auxi.appendChild(newspanprc);
  auxi.appendChild(newdivprc);




}



var removeElement = function () {
  if (contador_notas === 0) {
    window.alert("no quedan notas para eliminar.");
  }
  else {
    var aux = 'nota' + contador_notas;
    var aux2 = 'p' + contador_notas;

    var elem2 = document.getElementById('porcentajesdiv')
    var elem = document.getElementById('notasdiv');

    var oldp2 = document.getElementById(aux2);
    var oldp = document.getElementById(contador_notas);
    elem2.removeChild(oldp2)
    elem.removeChild(oldp);
    contador_notas--;
  }
}

var get_nota = function(pos){
  var aux = 'nota' + pos;
  return Number(document.getElementById(aux).value);
}

var get_porcentaje = function(pos) {
  var aux = 'porcentaje' + pos;
  return Number(document.getElementById(aux).value);
}

var promedio = function () {
  var sumatoria = 0;
  var sumatoriaprc = 0;
  var arreglo = [];
  var pos =0;
  var check;
  //veo si el porcentaje tiene 100% o no
  for (var i = 1; i <= contador_notas ; i++) {
    //obtengo las posiciones donde no hay notas
    if (get_nota(i) == 0) {
      arreglo[pos] = i;
      pos++;
      check = true;
    }
    sumatoria += get_nota(i);
    sumatoriaprc += get_porcentaje(i);
  }
  console.log(arreglo[0]);
  // si el porcentaje es 100% calculo el promedio por ponderacion, si el usuario no ingreso porcentajes entonces se hace por defecto(todas las notas)
  //con igual porcentaje
  if (sumatoriaprc == 100) {
    if (check) {
      console.log('faltan notas');
      var x = 0;
      var sumadeporcentajes= 0;//en esta variable se guardaran la suma de porcentajes para la formula
      //saco promedio sin las notas faltantes
      var promediosin= 0;
      for (var l = 1; l <= contador_notas; l++) {
        promediosin += get_nota(l) * (get_porcentaje(l)/100)
      }
      //obtener los porcentajes de las notas faltantes
      for (var k = 0; k < arreglo.length; k++) {
        //cambio las posiciones donde no hay notas por los porcentajes de las notas faltantes
        //arreglo[k] = get_porcentaje(arreglo[k]);//luego quitar si no es nesesaria
        sumadeporcentajes += (get_porcentaje(arreglo[k])/100);//ver formula , esta es la suma de promedios del divisor
      }
      x = (4-promediosin)/sumadeporcentajes;
      if (x > 7) {
        return 'imposible'; // imposible pasar pq nesecitaria una nota mayor a 7
      }
      if (x < 0) {
        return 'yapaso'; // ya paso puesto que no nesecita nota
      }
      for (var m = 0; m < arreglo.length; m++) {
        var nombre = 'nota'+arreglo[m];
        console.log(x);
        document.getElementById(nombre).value = x;
      }
      return 4;
    }
    else {
      var promediofinal= 0;
      for (var j = 1; j <= contador_notas; j++) {
        promediofinal += get_nota(j)*(get_porcentaje(j)/100 );
      }
      return promediofinal;
    }
  }
  else if (sumatoriaprc == 0) {
    var result = sumatoria/contador_notas;
    return result;
  }
  else if (sumatoriaprc <100 || sumatoriaprc>0) {
    console.log('test');
    return -1;
  }

}

var show_avrg = function () {
    check_Notify();
    var result = promedio();

    if (result == -1) {
      console.log('mal');
      var parent = document.getElementById('notificaciones');
      var newnotify = document.createElement('div');
      newnotify.setAttribute('class','alert alert-warning');
      newnotify.setAttribute('role','alert');
      var message = 'Revisa las ponderaciones peaso e laji ';
      newnotify.innerHTML = message;
      parent.appendChild(newnotify);
    }
    else {
      if (result >= 4 && result < 7) {
        //aprove
        var parent = document.getElementById('notificaciones');
        var newnotify = document.createElement('div');
        newnotify.setAttribute('class','alert alert-success');
        newnotify.setAttribute('role','alert');
        newnotify.setAttribute('id','notificacion1');
        var message = 'Pasaste el ramo con ' + result;
        newnotify.innerHTML = message;
        parent.appendChild(newnotify);
        contador_notificaciones++;

      }
      else if(result < 4 && result > 0.1){
        var parent = document.getElementById('notificaciones');
        var newnotify = document.createElement('div');
        newnotify.setAttribute('class','alert alert-danger');
        newnotify.setAttribute('role','alert');
        newnotify.setAttribute('id','notificacion1');
        var message = 'No pasaste :( tu nota fue ' + result;
        newnotify.innerHTML = message;
        parent.appendChild(newnotify);
        contador_notificaciones++;

      }
      else if (result === 'imposible') {
        var parent = document.getElementById('notificaciones');
        var newnotify = document.createElement('div');
        newnotify.setAttribute('class','alert alert-danger');
        newnotify.setAttribute('role','alert');
        newnotify.setAttribute('id','notificacion1');
        var message = 'No puedes pasar con ninguna nota';
        newnotify.innerHTML = message;
        parent.appendChild(newnotify);
        contador_notificaciones++;
      }
      else if (result === 'yapaso') {
        var parent = document.getElementById('notificaciones');
        var newnotify = document.createElement('div');
        newnotify.setAttribute('class','alert alert-success');
        newnotify.setAttribute('role','alert');
        newnotify.setAttribute('id','notificacion1');
        var message = 'YA PASASTE!! no nesecitas nota, apuesto ya sabias...';
        newnotify.innerHTML = message;
        parent.appendChild(newnotify);
        contador_notificaciones++;
      }
    }

  }
