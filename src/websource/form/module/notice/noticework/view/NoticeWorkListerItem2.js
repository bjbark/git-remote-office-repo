Ext.define('module.notice.noticework.view.NoticeWorkListerItem2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-noticework-lister-item2',
	store		: 'module.notice.noticework.store.NoticeWorkItem2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
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
					{	dataIndex: 'rank'		, text : Language.get('rank'		,'순번'		)	, width	:  50  , align : 'center',hidden : true
					},{ dataIndex: 'invc_numb'	, text : Language.get('ntce_numb'	,'공지번호'	)	, Width	:  90  , align : 'center',hidden : true
					},{ dataIndex: 'user_idcd'	, text : Language.get('user_idcd'	,'사원번호'	)	, Width	:  90  , align : 'center',hidden : true
					},{ dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'부서'		)	, width	:  60
					},{ dataIndex: 'wkrn_name'	, text : Language.get('wkrn_name'	,'직급'		)	, width	:  85
					},{ dataIndex: 'user_name'	, text : Language.get('user_name'	,'사원명'		)	, width	: 100
					},{ dataIndex: 'insp_yorn'	, text : Language.get('insp_yorn'	,'열람여부'	)	, width	: 120 ,hidden : true
					},{ dataIndex: 'insp_dttm'	, text : Language.get('insp_dttm'	,'열람일시'	)	, width	: 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_dttm'), align : 'center',hidden : true
					}
				]
			}
		;
		return item;
	}
});