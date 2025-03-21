Ext.define('module.custom.kortc.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcordr2-worker-lister2',
	store	: 'module.custom.kortc.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister2',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
				], pagingButton : false
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
					{	dataIndex:	'line_clos'		, width: 40, align : 'center'	, text: Language.get(''	, '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex:	'invc_date'		, width: 90 , align : 'center'	, text: Language.get(''	, '요청일자'	)
					},{	dataIndex:	'invc_numb'		, width: 90 , align : 'center'	, text: Language.get(''	, '요청번호'	)
					},{	dataIndex:	'acpt_numb'		, width: 90 , align : 'center'	, text: Language.get(''	, '수주번호'	)
					},{	dataIndex:	'acpt_amnd_degr', width: 50 , align : 'center'	, text: Language.get(''	, '차수'		)
					},{	dataIndex:	'dept_name'		, width: 90 , align : 'left'	, text: Language.get(''	, '요청부서'	),hidden: true
					},{	dataIndex:	'drtr_name'		, width: 90 , align : 'left'	, text: Language.get(''	, '담당자'	),hidden: true
					}
				]
			}
		;
		return item;
	},

});
