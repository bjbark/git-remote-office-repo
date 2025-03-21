Ext.define('module.custom.sjflv.prod.prodmtrlamnt.view.ProdMtrlAmntLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodmtrlamnt-lister2',
	store		: 'module.custom.sjflv.prod.prodmtrlamnt.store.ProdMtrlAmntLister2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('item_name') == '누계'){
				return 'text-blue';
			}
		}
	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex : 'cstm_name'	, text : Language.get(''	,'거래처'		), width: 120, align : 'center'
					},{ dataIndex : 'item_name'	, text : Language.get(''	,'품명'		), width: 200, align : 'center'
					},{ dataIndex : 'item_spec'	, text : Language.get(''	,'규격'		), width: 150, align : 'center'
					},{
						text: Language.get(''	,'이월'		), dataIndex : ''	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get(''	,'수량'		), dataIndex: '', style: 'text-align:center;' , width : 100
							},{	text : Language.get(''	,'금액'		), dataIndex: '', style: 'text-align:center;' , width : 100
							}
						]
					},{
						text: Language.get(''	,'입고'		), dataIndex : ''	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get(''	,'수량'		), dataIndex: '', style: 'text-align:center;' , width : 100
							},{	text : Language.get(''	,'금액'		), dataIndex: '', style: 'text-align:center;' , width : 100
							}
						]
					},{
						text: Language.get(''	,'출고'		), dataIndex : ''	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get(''	,'수량'		), dataIndex: '', style: 'text-align:center;' , width : 100
							},{	text : Language.get(''	,'금액'		), dataIndex: '', style: 'text-align:center;' , width : 100
							}
						]
					},{
						text: Language.get(''	,'재고'		), dataIndex : ''	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get(''	,'수량'		), dataIndex: '', style: 'text-align:center;' , width : 100
							},{	text : Language.get(''	,'금액'		), dataIndex: '', style: 'text-align:center;' , width : 100
							}
						]
					}
				]
			}
		;
		return item;
	}
});