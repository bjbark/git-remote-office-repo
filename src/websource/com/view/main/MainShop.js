Ext.define('com.view.main.MainShop', { extend: 'Axt.grid.Panel',
	
	alias: 'widget.mainshop',
	
	//store: 'module.basic.bankinfo.store.BankInfo',
	border : 0, 
	columnLines: true ,  // 컬럼별 라인 구분
	//selModel: {	selType: 'checkboxmodel' , mode : 'SINGLE' },
	//features    : [{ ftype : 'grid-summary' , remote : true } ],	
	//plugins		: [{ ptype:'gridcolumnconfig'  } ],
	
	/**
	 * 
	 */
	initComponent: function () {
		var me = this;
		//me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	
	/**
	 * 
	 */
	pagingItem : function () {
		var item = 
		{ 
			xtype	: 'grid-paging' ,
			items	: [
				'->', '-', 
				{text	: Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action }, 
				{text	: Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action }, 
				{text	: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action }, '-' ,
				{text	: Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action }
			]
		};
		return item ;
	},
	/**
	 * 
	 */
	columnItem : function () {
		var item = [
		 	{ text : '메모'  , dataIndex: 'stor_nm'     ,flex     : 1  }
		];
		return item;
	}
 });



