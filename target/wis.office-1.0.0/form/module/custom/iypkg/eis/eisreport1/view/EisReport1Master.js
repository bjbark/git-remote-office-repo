Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport1-master'			,
	store		: 'module.custom.iypkg.eis.eisreport1.store.EisReport1Master',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},


	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		, '상태'	) , width:  50, align : 'center'	, xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'수주일자') , width : 140 , align :'left'
					},{ dataIndex: 'dlvy_cstm_name'	, text : Language.get('dlvy_cstm_name'	,'수주처'	) , width : 150 , align :'left'
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'제품명'	) , flex : 1 , align :'left'
					},{ dataIndex: 'item'			, text : Language.get('item'			,'제품규격'	) , width : 140 , align :'left'
					},{ dataIndex: 'vatx_rate'		, text : Language.get('vatx_rate'		,'부가율'	) , width : 80 , align :'right'
					},{ dataIndex: 'invc_numb'		, text : Language.get('vatx_rate'		,'부가율'	) , width : 100 , align :'right',hidden:true
					}
				]
			}
		;
		return item;
	}
});