Ext.define('module.qc.basic.iteminspstd.view.ItemInspStdListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iteminspstd-lister-master',
	store		: 'module.qc.basic.iteminspstd.store.ItemInspStdMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,

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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'insp_type_code'	, text : Language.get('insp_type_code'	,'검사유형코드')	, width : 200 , align : 'center'
					},{ dataIndex: 'insp_type_name'	, text : Language.get('insp_type_name'	,'검사유형명')	, flex  : 350
					},{ dataIndex: 'insp_mthd_dvcd'	, text : Language.get('insp_mthd_dvcd'	,'검사방법')	, width : 140  ,xtype :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')
					},{ dataIndex: 'smor_rate'		, text : Language.get('smor_rate'		,'시료율')		, width	: 100  , xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},
				]
			}
		;
		return item;
	}
});
