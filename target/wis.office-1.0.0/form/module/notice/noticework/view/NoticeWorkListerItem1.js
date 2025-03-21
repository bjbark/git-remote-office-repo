Ext.define('module.notice.noticework.view.NoticeWorkListerItem1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-noticework-lister-item1'			,
	store		: 'module.notice.noticework.store.NoticeWorkItem1'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },

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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults : {style: 'text-align: center'},
				items : [
						{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'		)	, width	:  50	, align : 'center', hidden:true
						},{ dataIndex: 'invc_numb'	, text : Language.get('ntce_numb'	,'공지번호'	)	, Width	:  90	, align : 'center', hidden:true
						},{ dataIndex: 'empy_idcd'	, text : Language.get('empy_idcd'	,'사원번호'	)	, Width	:  90	, align : 'center', hidden:true
						},{ dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'부서'		)	, width	:  60
						},{ dataIndex: 'wkrn_name'	, text : Language.get('wkrn_name'	,'직급'		)	, width	:  85
						},{ dataIndex: 'empy_name'	, text : Language.get('empy_name'	,'사원명'		)	, width	: 100
						},{ dataIndex: 'insp_yorn'	, text : Language.get('insp_yorn'	,'열람여부'	)	, width	:  80	, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),align : 'center'
						},{ dataIndex: 'insp_dttm'	, text : Language.get('insp_dttm'	,'열람일시'	)	, width : 120	,align : 'center'
					}
				]
			}
		;
		return item;
	}
});