Ext.define('module.qc.anal.insplist2.view.InspList2Lister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-insplist2-lister',

	store		: 'module.qc.anal.insplist2.store.InspList2Lister',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {

		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
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
					{	dataIndex:	'invc_date'		, width:  80, align : 'center'	, text: Language.get('invc_date'	, '생산일자'	), hidden : true
					},{	dataIndex:	'invc_numb'		, width: 120, align : 'left'	, text: Language.get('invc_numb'	, '생산번호'	)
					},{	dataIndex:	'cstm_name'		, width: 130, align : 'center'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'acpt_numb'		, width: 130, align : 'left'	, text: Language.get('acpt_numb'	, '수주번호'	)
					},{	dataIndex:	'item_name'		, width:  80, align : 'center'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width:  80, align : 'center'	, text: Language.get('item_spec'	, '규격'		)
					//},{	dataIndex:	''				, width:  80, align : 'left'	, text: Language.get(''				, '차종'	)
					},{	dataIndex:	'modl_name'		, width: 100, align : 'left'	, text: Language.get('modl_name'	, '모델명'	)
					},{	dataIndex:	'wkct_name'		, width: 100, align : 'center'	, text: Language.get('wkct_name'	, '공정'		)
					},{	dataIndex:	'wkct_idcd'		, width: 130, align : 'left'	, text: Language.get('wkct_idcd'	, '공정코드'	), hidden : true
					},{	dataIndex:	'user_name'		, width:  80, align : 'center'	, text: Language.get('user_name'	, '작업자'		)
					},{	dataIndex:	'drtr_idcd'		, width:  80, align : 'right'	, text: Language.get('drtr_idcd'	, '작업자코드'	), hidden : true
					},{	dataIndex:	'sttm'			, width: 130, align : 'right'	, text: Language.get('sttm'			, '시작일시'	),
						renderer:function(value){
								console.log(value);
							var	yyyy="",
							mm="",
							dd="",
							hh="",
							ss="",
							value2 = ""
						;
						if (value.length==16){
								yyyy = value.substr(0,4),
								mm = value.substr(5,5),
								dd = value.substr(10,16),
								value2 = yyyy+'-'+mm+':'+dd,
								console.log(value2)
								}else{
									return value;
								}
						return value2;
						},
					},{	dataIndex:	'edtm'			, width: 130, align : 'right'	, text: Language.get('edtm'			, '종료일시'	),
							renderer:function(value){
							var	yyyy="",
								mm	="",
								dd	="",
								hh	="",
								ss	="",
							value2  = ""
						;
						if (value.length==16){
							yyyy = value.substr(0,4),
							mm = value.substr(5,5),
							dd = value.substr(10,16),
							value2 = yyyy+'-'+mm+':'+dd,
							console.log(value2)
							}else{
								return value;
							}
						return value2;
						},
					},{	dataIndex:	'indn_qntt'		, width:  80, align : 'right'	, text: Language.get('indn_qntt'	, '지시수량'	)
					},{	dataIndex:	'prod_qntt'		, width:  80, align : 'right'	, text: Language.get('prod_qntt'	, '생산수량'	)
					},{	dataIndex:	'poor_qntt'		, width:  80, align : 'right'	, text: Language.get('poor_qntt'	, '불량수량'	)
					},{	dataIndex:	'poor_name'		, width:  80, align : 'right'	, text: Language.get('poor_name'	, '불량형태구분'	)
					},{	dataIndex:	'poor_proc_dvcd', width:  80, align : 'right'	, text: Language.get('', '불량처리구분'),	hidden   : false,
						renderer : function(value){
							if(value=='1'){
								return '재작업';
							}else if(value=='2'){
								return '폐기';
							}else if(value=='3'){
								return '분해';
							}else if(value=='4'){
								return '특채';
							}else{
								return '';
							}
						}
					}
				]
			};
		return item;
	}
});
