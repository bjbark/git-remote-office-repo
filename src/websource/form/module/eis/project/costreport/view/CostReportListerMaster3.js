Ext.define('module.eis.project.costreport.view.CostReportListerMaster3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-costreport-lister-master3',
	store		: 'module.eis.project.costreport.store.CostReportMaster3',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'		) , width :100  , align : 'left'
					},{ dataIndex: 'yyyymm'			, text : Language.get('yyyymm'			,'년월'		) , width : 80  , align : 'center'
					},{ dataIndex: 'd01'			, text : Language.get('d01'				,'d01'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd02'			, text : Language.get('d02'				,'d02'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd03'			, text : Language.get('d03'				,'d03'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd04'			, text : Language.get('d04'				,'d04'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd05'			, text : Language.get('d05'				,'d05'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd06'			, text : Language.get('d06'				,'d06'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd07'			, text : Language.get('d07'				,'d07'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd08'			, text : Language.get('d08'				,'d08'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd09'			, text : Language.get('d09'				,'d09'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd10'			, text : Language.get('d10'				,'d10'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd11'			, text : Language.get('d11'				,'d11'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd12'			, text : Language.get('d12'				,'d12'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd13'			, text : Language.get('d13'				,'d13'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd14'			, text : Language.get('d14'				,'d14'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd15'			, text : Language.get('d15'				,'d15'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd16'			, text : Language.get('d16'				,'d16'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd17'			, text : Language.get('d17'				,'d17'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd18'			, text : Language.get('d18'				,'d18'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd19'			, text : Language.get('d19'				,'d19'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd20'			, text : Language.get('d20'				,'d20'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd21'			, text : Language.get('d21'				,'d21'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd22'			, text : Language.get('d22'				,'d22'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd23'			, text : Language.get('d23'				,'d23'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd24'			, text : Language.get('d24'				,'d24'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd25'			, text : Language.get('d25'				,'d25'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd26'			, text : Language.get('d26'				,'d26'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd27'			, text : Language.get('d27'				,'d27'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd28'			, text : Language.get('d28'				,'d28'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd29'			, text : Language.get('d29'				,'d29'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd30'			, text : Language.get('d30'				,'d30'		) , width : 45  , align : 'right'
					},{ dataIndex: 'd31'			, text : Language.get('d31'				,'d31'		) , width : 45  , align : 'right'
					}
				]
			}
		;
		return item;
	}
});
