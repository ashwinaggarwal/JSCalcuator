var $display = $('.display input'),
buffer='',
lastOp=null;

function isInt(n) {
	return n % 1 === 0;
}

$('.keys').on('click','.key',function(e){
	var displayVal=$display.val(),	
	key = $(this).attr('value'),
	isfloatOp = (/\./).test(displayVal)||false,
	isOp = $(this).hasClass('op');

	if(displayVal.length>13 && key!='CE')
		return;

	if((displayVal==''||lastOp==null) && key=='equal')
		return;

	if((isfloatOp||lastOp==null)&& key=='.')
		return;

	if(!isOp)
		displayVal+=key;

	if(isOp && displayVal!=''){
		if(key!='CE'){
				//buffer+=parseInt(displayVal);
				if(lastOp!=null){
					displayVal = eval(buffer+lastOp+displayVal); 
					if(!isInt(displayVal))
						displayVal=parseFloat(displayVal).toFixed(4);				
					buffer=displayVal;
					lastOp=null;
				}
				else{
					if(isfloatOp)
						buffer=parseFloat(displayVal);
					else
						buffer=parseInt(displayVal);
					lastOp=key;	
					displayVal='';
				}
			}
			else{
				buffer='';
				lastOp=null;
				isfloatOp=false;
				displayVal='';
			}
		}
		
		$display.val(displayVal);
	});
