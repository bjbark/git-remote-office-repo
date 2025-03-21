Ext.define('lookup.popup.model.BankPopup',{ extend:'Axt.data.Model' ,
	fields:
	[
	 	{name: 'hq_id',         		type: 'string'   , defaultValue : _global.hq_id },
	 	{name: 'stor_grp',         		type: 'string'   , defaultValue : _global.stor_grp },
	 	{name: 'stor_id',         		type: 'string'   , defaultValue : _global.stor_id },
	 	{name: 'stor_nm',         		type: 'string'   , defaultValue : _global.stor_nm },
	 	{name: 'dept_id',         	    type: 'string'  },   
	 	{name: 'dept_nm',            	type: 'string'   , persist : false },
	 	{name: 'bank_id', 		  	    type: 'string'  }, 
	 	{name: 'bank_nm',   		    type: 'string'   , persist : false }, 
	 	{name: 'account_id',           	type: 'string'  },
	 	{name: 'account_cd',        	type: 'string'  },
	 	{name: 'account_no',    	   	type: 'string'  },
	 	{name: 'account_nm',         	type: 'string'  },
	 	{name: 'account_ow', 	 	    type: 'string'  },
	 	{name: 'user_memo',         	type: 'string'  }, 
	 	{name: 'web_use_yn',         	type: 'string'   , defaultValue : '0' },
	 	{name: 'row_sts',         	type: 'string'   , defaultValue : '0' }
	 ]	
});
