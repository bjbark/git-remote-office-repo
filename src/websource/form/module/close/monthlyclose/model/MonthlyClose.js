Ext.define('module.close.monthlyclose.model.MonthlyClose', { extend: 'Axt.data.Model',
    fields: 
    [
             
     	{name:'stor_id'   , type:'string' },
     	{name:'stor_nm'   , type:'string' , persist: false },

     	{name:'itm_month_ym'   , type:'string' , convert:Ext.util.Format.strToDateYm },
     	{name:'cust_month_ym'   , type:'string' , convert:Ext.util.Format.strToDateYm },
     	{name:'vend_month_ym'   , type:'string' , convert:Ext.util.Format.strToDateYm }
    ]
});
