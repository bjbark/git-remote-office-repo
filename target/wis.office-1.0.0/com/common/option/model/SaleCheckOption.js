Ext.define('com.common.option.model.SaleCheckOption', { extend:'Ext.data.Model',
    fields: [
        { name : 'hdli_id'   		, type:'string' , defaultValue : '5101000' },
        { name : 'taekbae_nm'   		, type:'string' , defaultValue : '자체배송' },
        { name : 'tid'    				, type:'string' },
        { name : 'sid'    				, type:'string' },
        { name : 'bid'    				, type:'string' },
        { name : 'print_count'  		, type:'string' , defaultValue : '1' },
        { name : 'prefix'    			, type:'string' },
        { name : 'suffix'    			, type:'string' },
        { name : 'fare'  				, type:'float'  , defaultValue : 0 },
        { name : 'faretype'  			, type:'string' , defaultValue : '3' },
        { name : 'unit'  				, type:'string' , defaultValue : '2' },
        { name : 'print_yn'  			, type:'string' , defaultValue : '0' },
        { name : 'invoice_yn'  			, type:'string' , defaultValue : '0' }
    ]
});
