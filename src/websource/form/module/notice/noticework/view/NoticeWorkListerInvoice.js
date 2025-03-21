Ext.define('module.notice.noticework.view.NoticeWorkInvoice', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-noticework-lister-invoice'			,
	store		: 'module.notice.noticework.store.NoticeWorkInvoice'	,
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults : {style: 'text-align: center'},
				items : [
					{	dataIndex: 'empy_idcd'	, text : Language.get('empy_idcd'	,'대상자ID'	)	, width : 50  , align : 'center', hidden : true
					},{ dataIndex: 'invc_numb'	, text : Language.get('ntce_numb'	,'공지번호'	)	, Width : 90  , hidden : true
					},{ dataIndex: 'empy_name'	, text : Language.get('empy_name'	,'대상자'		)	, Width : 70  , align : 'left'
					},{ dataIndex: 'insp_yorn'	, text : Language.get('insp_yorn'	,'열람여부'	)	, Width : 50  , xtype : 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),align : 'center'
					},{ dataIndex: 'insp_dttm'	, text : Language.get('insp_dttm'	,'열람일자'	)	, Width : 200
					},{ dataIndex: 'ansr_cont'	, text : Language.get('ansr_cont'	,'답글내용'	)	, width : 300 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});