/**
 * 우편번호 팝업(Axt.popup.view.ZIpcodeSearch)에서 사용되는 master model
 */
Ext.define('Axt.popup.model.ZipcodeSearch', { extend:'Axt.data.Model', 
    fields:[
        {name: 'zip_id', 	type: 'string'}, 
        {name: 'zip_cd', 	type: 'string'}, 
        {name: 'seq_id', 	type: 'string'}, 
        
        {name: 'zip_gb', 	type: 'string'}, /* 0:이전주소, 1:도로주소 */
        
	  	{name: 'road_id',   type: 'string'},
	 	{name: 'road_cd',   type: 'string'},
	 	{name: 'road_nm',   type: 'string'},
        
        {name: 'state', 	type: 'string'},
        {name: 'city', 		type: 'string'}, 
        {name: 'dong', 		type: 'string'}, 
        {name: 'bunji', 	type: 'string'}, 
        {name: 'addr_2', 	type: 'string'}, 
        {name: 'island',	type: 'string'},
	     /* -------------------------------------------- */
	  	{name: '_zip_cd',   type: 'string'  , persist : false , 
	     	convert : function (value, model) {
//	     		console.debug('zip_id', model.get('zip_id'));
	     		var first_zipcd = model.get('zip_id').substring(0,3);
	     		var last_zipcd = model.get('zip_id').substring(3,6);
//	     		console.debug('zipcd', first_zipcd + "-" + last_zipcd );
	     		return first_zipcd + "-" + last_zipcd ;
	     	}
	  	}        
    ]
});
