Ext.define('module.qc.basic.moldinspstd.view.MoldInspStdItem1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-moldinspstd-lister-item1'			,
	store		: 'module.qc.basic.moldinspstd.store.MoldInspStdItem1'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	title  		:  Language.get('','등록품목'),
	header 		: {
		titleAlign: 'center',
		baseCls : Ext.baseCSSPrefix + 'column-header',
		height 	: 22

	},

	columnLines : true,
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults : {style: 'text-align: center'},
				items : [
					{	dataIndex: 'insp_type_idcd'	, text : Language.get('insp_type_idcd'	,'검사유형id')	, width : 150  , align : 'center',hidden : true
					},{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드')	, width :100  , align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명')		, width :250  , align : 'left'
					},{ dataIndex: 'mold_spec'		, text : Language.get('mold_spec'		,'금형규격')	, flex	: 1,minWidth	: 90
					}
				]
			}
		;
		return item;
	}
});