Ext.define('module.qc.insp.inspentry51.view.InspEntry51Detail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry51-detail',
	store		: 'module.qc.insp.inspentry51.store.InspEntry51Detail',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.createDock()];
		me.columns = me.columnItem();
		me.callParent();
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'			, text : Language.get('invc_numb'		,'invoice번호')	, width : 60, hidden : true
					},{ dataIndex: 'line_seqn'			, text : Language.get('line_seqn'	,	'순번')			, width : 60, align : 'center', hidden : true
					},{ dataIndex: 'insp_sbsc_seqn'		, text : Language.get('insp_sbsc_seqn'	,'순번')			, width : 60, align : 'center'
					},{ dataIndex: 'insp_sbsc_name'		, text : Language.get('insp_sbsc_name'	,'검사항목명')		, width : 300
					},{ dataIndex: 'msmt_valu_1fst'		, text : Language.get('msmt_valu_1fst'	,'적합여부')		, width : 70, align : 'center'
						, tdCls : 'editingcolumn',xtype : 'lookupcolumn', lookupValue : [["0","아니오"],["1","예"]],
						editor	: {
							xtype		: 'lookupfield',
							name		: 'msmt_valu_1fst',
							itemId		: 'msmt_valu_1fst',
							selectOnFocus: true,
							allowBlank	: false,
//							readOnly	: true,
							fieldCls	: 'requiredindex',
							lookupValue	: [["0","아니오"],["1","예"]]
						}
					}
				]
			}
		;
		return item;
	},
});