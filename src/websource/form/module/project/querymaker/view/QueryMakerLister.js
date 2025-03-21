Ext.define('module.project.querymaker.view.QueryMakerLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-querymaker-lister',
	store: 'module.project.querymaker.store.QueryMaker',
	columnLines: true ,
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
			xtype : 'grid-paging',
			items: [
			 	'->', '-' ,
			 	{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
			 	{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
   	 		 	{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
		    ]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center', align: 'center'},
				items : [
					{	dataIndex:	'path'       	, width:  80, align: 'left'   , text: Language.get( 'path'       , '경로'	), hidden: true
					},{	dataIndex:	'srvc'       	, width:  80, align: 'left'   , text: Language.get( 'srvc'       , '서비스'	), hidden: true
					},{	dataIndex:	'modl'       	, width:  80, align: 'left'   , text: Language.get( 'modl'       , '모쥴'	), hidden: true
					},{	dataIndex:	'line_no'    	, width:  50, align: 'center' , text: Language.get( 'line_no'    , '라인'	)        , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'type_cd'    	, width:  40, align: 'left'   , text: Language.get( 'type_cd'    , '타입'	)
					},{	dataIndex:	'query_txt'  	, flex :   1, align: 'left'   , text: Language.get( 'query_txt'  , '쿼리문장'	)
					},{	dataIndex:	'deli_val'   	, width:  80, align: 'left'   , text: Language.get( 'deli_val'   , '전달값'	)
					},{	dataIndex:	'cnst_val'   	, width:  80, align: 'left'   , text: Language.get( 'cnst_val'   , '상수값'	)
					},{	dataIndex:	'ref_1'      	, width:  80, align: 'left'   , text: Language.get( 'ref_1'      , '참조1'	), hidden: true
					},{	dataIndex:	'ref_2'      	, width:  80, align: 'left'   , text: Language.get( 'ref_2'      , '참조2'	), hidden: true
					},{	dataIndex:	'ref_3'      	, width:  80, align: 'left'   , text: Language.get( 'ref_3'      , '참조3'	), hidden: true
					},{	dataIndex:	'ref_4'      	, width:  80, align: 'left'   , text: Language.get( 'ref_4'      , '참조4'	), hidden: true
					},{	dataIndex:	'ref_5'      	, width:  80, align: 'left'   , text: Language.get( 'ref_5'      , '참조5'	), hidden: true
					},{	dataIndex:	'ref_6'      	, width:  80, align: 'left'   , text: Language.get( 'ref_6'      , '참조6'	), hidden: true
					},{	dataIndex:	'ref_7'      	, width:  80, align: 'left'   , text: Language.get( 'ref_7'      , '참조7'	), hidden: true
					},{	dataIndex:	'ref_8'      	, width:  80, align: 'left'   , text: Language.get( 'ref_8'      , '참조8'	), hidden: true
					},{	dataIndex:	'usr_memo'   	, width: 200, align: 'left'   , text: Language.get( 'usr_memo'   , '사용자메모'	), hidden: true
					},{	dataIndex:	'sys_memo'   	, width: 200, align: 'left'   , text: Language.get( 'sys_memo'   , '시스템메모'	), hidden: true
					},{	dataIndex:	'upt_dttm'   	, width:  80, align: 'left'   , text: Language.get( 'upt_dttm'   , '수정일시'	), hidden: true
					},{	dataIndex:	'crt_dttm'   	, width:  80, align: 'left'   , text: Language.get( 'crt_dttm'   , '작성DTTM'	), hidden: true
					}
				]
			}
		;
		return item;
	}
});





