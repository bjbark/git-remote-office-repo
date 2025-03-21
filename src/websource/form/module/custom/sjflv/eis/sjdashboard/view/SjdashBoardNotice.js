Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardNotice', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-notice',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardNotice',
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

				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{ dataIndex: 'ntce_ttle'		, text : Language.get('ntce_ttle'		, '제목'			)	, width : 250	, align : 'left'
					},{ dataIndex: 'sbsd_ttle'		, text : Language.get('sbsd_ttle'		, '부제목'		)	, width : 100	, align : 'left'
					},{ dataIndex: 'dwup_empy_name'	, text : Language.get('empy_name'		, '작성자'		)	, width :  80	, align : 'left'
					},{ dataIndex: 'dwup_date'		, text : Language.get('dwup_date'		, '작성일자'		)	, width : 100	, align : 'center'
					},{ dataIndex: 'emgc_yorn'		, text : Language.get('emgc_yorn'		, '긴급'			)	, width :  60	, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '비고'			)	, flex : 250	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});
