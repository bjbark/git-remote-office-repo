Ext.define('module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlsubslist-lister',
	store		: 'module.custom.sjflv.item.mtrlsubslist.store.MtrlSubsList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary' , remote : true } ],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
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
					{ dataIndex: 'test_date'			, text : Language.get(''	,'실험일자')	, width : 80, align : 'center'
					},{ dataIndex: 'item_code'			, text : Language.get(''	,'자재코드')	, width : 150 , align : 'left'
					},{ dataIndex: 'item_name'			, text : Language.get(''	,'자재명')		, width : 250 , align : 'left'
					},{ dataIndex: 'befr_splr_name'		, text : Language.get(''	,'기존 공급사')	, width : 110 , align : 'left'
					},{ dataIndex: 'befr_mker_name'		, text : Language.get(''	,'기존 제조사')	, width : 110 , align : 'left'
					},{ dataIndex: 'splr_name'			, text : Language.get(''	,'대치 공급사')	, width : 110 , align : 'left'
					},{ dataIndex: 'mker_name'			, text : Language.get(''	,'대치 제조사')	, width : 110 , align : 'left'
					},{ dataIndex: 'usag_qntt_memo'		, text : Language.get(''	,'사용량')		, width : 200 , align : 'left'
					},{ dataIndex: 'mtrl_sbzt_dvcd'		, text : Language.get(''	,'대치유형')	, width : 70 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('mtrl_sbzt_dvcd')
					},{ dataIndex: 'ecod_purp'			, text : Language.get(''	,'Test 목적')	, width : 200 , align : 'left'
					},{ dataIndex: 'hala_yorn'			, text : Language.get(''	,'할랄여부')	, width : 60 , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'fema'				, text : Language.get(''	,'FMEA')	, width : 100 , align : 'left'
					},{ dataIndex: 'test_drtr_name'		, text : Language.get(''	,'실험자')		, width : 120 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});