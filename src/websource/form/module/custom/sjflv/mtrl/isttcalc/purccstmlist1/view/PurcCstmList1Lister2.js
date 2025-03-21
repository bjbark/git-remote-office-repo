Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purccstmlist1-lister2',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.store.PurcCstmList2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines	: true,	
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('item_name') == '누계'){
				return 'text-blue';
			}
		}
	},
	
	initComponent: function () {
		var me     = this;
		me.dockedItems = [{xtype: 'module-purccstmlist1-worker-search'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me		= this,
			item	=  {
				defaults: {style: 'text-align:center'},
				items		: [
					{	dataIndex: 'invc_date'	, text : Language.get('invc_date'	,'일자')	, width :  90 , align : 'center',
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'적요')	, width : 232 , align : 'left',
					},{ dataIndex: 'puch_amnt'	, text : Language.get('puch_amnt'	,'매입')	, width : 105 , xtype :'numericcolumn', align : 'right',
					},{ dataIndex: 'colt_amnt'	, text : Language.get('colt_amnt'	,'지급')	, width : 105 , xtype :'numericcolumn', align : 'right',
					},{ dataIndex: 'npay_amnt'	, text : Language.get('npay_amnt'	,'잔액')	, width : 125 , xtype :'numericcolumn', align : 'right',
					}
				]
			};
		return item;
	}
 });