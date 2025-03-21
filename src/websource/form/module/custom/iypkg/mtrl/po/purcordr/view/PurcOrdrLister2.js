Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-lister2',
	store		: 'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrLister2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			console.log(record);
			if(record.get('invc_date') == '합계' || record.get('prod_name') == '월계'){
				return 'text-warn';
			}else if(record.get('prod_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get( 'invc_date'	, '수주일자'		)
					},{	dataIndex:	'invc_numb'		, width: 150, align : 'center'	, text: Language.get( 'invc_numb'	, '수주번호'		)
					},{	dataIndex:	'cstm_name'		, width: 160, align : 'left'	, text: Language.get( 'cstm_name'	, '수주처명'		)
					},{	dataIndex:	'prod_name'		, width: 200, align : 'left'	, text: Language.get( 'prod_name'	, '품명'			)
					},{	dataIndex:	'prod_spec'		, width: 100, align : 'left'	, text: Language.get( 'prod_spec'	, '규격'			)
					},{	dataIndex:	'acpt_qntt'		, width:  80, align : 'right'	, text: Language.get( 'acpt_qntt'	, '수주량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'deli_date'		, width: 100, align : 'center'	, text: Language.get( 'deli_date'	, '납기일자'		)
					},{	dataIndex:	'fabc_name'		, width: 200, align : 'left'	, text: Language.get( 'fabc_name'	, '원단명'			)
					},{	dataIndex:	'ppln_dvcd'		, width:  80, align : 'center'	, text: Language.get( 'ppln_dvcd'	, '골'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'fdat_spec'		, width: 100, align : 'left'	, text: Language.get( 'fdat_spec'	, '재단규격'		)
					},{	dataIndex:	'item_fxqt'		, width:  60, align : 'right'	, text: Language.get( 'item_fxqt'	, '절수'			)
					},{	dataIndex:	'need_qntt'		, width:  70, align : 'right'	, text: Language.get( 'need_qntt'	, '소요량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'offr_qntt'		, width:  70, align : 'right'	, text: Language.get( 'offr_qntt'	, '발주량'			), xtype: 'numericcolumn'
					},{	dataIndex:	'unoffr'		, width:  70, align : 'right'	, text: Language.get( 'unoffr'		, '미발주량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'pcod_numb'		, width: 180, align : 'left'	, text: Language.get( 'pcod_numb'	, 'P/O No'		)
					}
				]
			};
		return item;
	}
 });