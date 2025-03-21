Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-docmcheck-lister1',
	
	store		: 'module.custom.sjflv.haccp.docmcheck.store.DocmCheckStore1',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	
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
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.INSERT.text	, iconCls: Const.INSERT.icon	, action: Const.INSERT.action	, cls: 'button-style' },
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text: Language.get(''	, '양식보기'	) , dataIndex: ''	, width: 70		, align: 'center'
						, renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text	: '<span style="color : white !important;">보기</span>',
									width	: 60,
									height	: 19,
									cls		: 'button-style',
									handler	: function(b, e){
										e.stopEvent();
										me.loadPopup(rec)	
									}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						}
					},{	text: Language.get(''	, '관리번호'	) , dataIndex: 'mngt_numb'		, width: 100	, align: 'center'
					},{	text: Language.get(''	, '문서분류#1'	) , dataIndex: 'docm_bacd_1fst'	, width: 90		, align: 'center'
					},{	text: Language.get(''	, '문서분류#2'	) , dataIndex: 'docm_bacd_2snd'	, width: 90		, align: 'center'
					},{	text: Language.get(''	, '문서분류#3'	) , dataIndex: 'docm_bacd_3trd'	, width: 90		, align: 'center'
					},{	text: Language.get(''	, '문서명'		) , dataIndex: 'docm_name'		, width: 180	, align: 'center'
					},{	text: Language.get(''	, '문서번호'	) , dataIndex: 'docm_numb'		, width: 130	, align: 'center'
					},{	text: Language.get(''	, '작성주기'	) , dataIndex: 'dwup_ccle_dvcd'	, width: 80		, align: 'center'
					},{	text: Language.get(''	, '상태'		) , dataIndex: 'line_stat'		, width: 80		, align: 'center'	, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('dele_yorn')
					}
				]
			};
		return item;
	},

	loadPopup: function(record) {
		resource.loadPopup({
			widget	: 'module-sjflv-docmmast-popup1',
			params	: record
		});
	}
});

