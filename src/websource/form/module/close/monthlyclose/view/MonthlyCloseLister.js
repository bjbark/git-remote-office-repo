Ext.define('module.close.monthlyclose.view.MonthlyCloseLister', { extend: 'Axt.grid.Panel',

	alias       : 'widget.module-monthlyclose-lister',
	store       : 'module.close.monthlyclose.store.MonthlyClose',
	width       : 305,
	minWidth    : 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' } ,
    features	: [{ ftype : 'grid-summary' , remote : true } ],
	//selModel: { selType: 'checkboxmodel', mode : 'SINGLE' },

	viewConfig: {
	    markDirty: false , loadMask : false
	},
   /**
    *
    */
   initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
    	me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items:
				[
			 		'->',// '-' ,
			 		{
 		 		 		fieldLabel     : '월마감구분',
 		 		 		xtype          : 'lookupfield',
 		 		 		name           : 'close_gb',
 		 		 		editable       : false,
 		 		 		labelSeparator : '',
 		 		 		labelAlign     : 'right',
 		 		 		width          : 180 ,
 		 		 	    labelWidth     : 70,
 		 		 		lookupValue    :  resource.lookup('monthlyclose_gb' ),
 		 		 		value          : '2072101'
			 		},
			 		{
			 			// fieldLabel   : Language.get('', '마감년월'),
			        	 xtype 	      : 'monthfield',
			        	 name         : 'trmn_dt',
			        	 submitFormat : 'Ym',
			        	 format       : 'Y-m',
			        	 value        : Ext.Date.format( Ext.Date.add( new Date(), Ext.Date.MONTH, -1) , 'Y-m'),
			        	 width        : 80,
			        	 //labelWidth   : 70
			 		},
	   	 	 		{text : '마감처리', iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' } , '-',


			 		{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-'
			 	]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item ={
				defaults: {style: 'text-align:center'},
				items : [
		 	   		//{ 	dataIndex: 'clos_nm',       width: 280, align:'left'   , text: '업무명'   },
		 	   	   {   dataIndex: 'stor_nm',      width: 200, align:'left' , text: '사업장명' },
                   { 	dataIndex: 'itm_month_ym',       width:  90, align:'center' , text: '수불장' },
                   { 	dataIndex: 'cust_month_ym',       width:  90, align:'center' , text: '매출처' },
                   { 	dataIndex: 'vend_month_ym',       width:  90, align:'center' , text: '매입처' }
	        	]
            };

		return item;
	}
 });
