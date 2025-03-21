Ext.define('module.prod.cvic.cviclist.view.CvicListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cviclist-lister2',
	store		: 'module.prod.cvic.cviclist.store.CvicList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	border		: 0,
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
			cvic = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">이력카드 발행</span>',    action : 'cardAction', cls: 'button1-style'	},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return cvic ;
	},


	columnItem : function () {
		var me = this,
			cvic = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 150
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'		) , width : 100
					},{ dataIndex: 'clss_name'		, text : Language.get(''				,'설비분류기준'	) , width : 80
					},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격'		) , width : 80
					},{ dataIndex: 'cvic_kind_dvcd'	, text : Language.get('cvic_kind_dvcd'	,'설비종류'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_kind_dvcd'), align : 'center'
					},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태'		) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					},{ dataIndex: 'prod_abty'		, text : Language.get('prod_abty'		,'생산능력'		) , width : 70  , align : 'right'
					}
				]
			}
		;
		return cvic;
	}
});
