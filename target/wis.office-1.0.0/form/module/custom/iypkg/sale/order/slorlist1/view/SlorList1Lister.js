Ext.define('module.custom.iypkg.sale.order.slorlist1.view.SlorList1Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist1-lister',
	store		: 'module.custom.iypkg.sale.order.slorlist1.store.SlorList1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('rnum') == '4' || record.get('rnum') == '5'){
				return 'text-warn';
			}else if(record.get('rnum') == '1'){
				return 'text-gray';
			}else if(record.get('rnum') == '2' || record.get('rnum') == '3'){
				return 'text-blue';
			}else if(record.get('rnum') == '6' || record.get('rnum') == '7'){
				return 'text-success';
			}
		}
	},


	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">수발대장 발행</span>', action : 'printAction'	, cls: 'button1-style'	, hidden: _global.hqof_idcd.toUpperCase()!= 'N1000DAE-A'} , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex : 'invc_numb'	, text : Language.get('acpt_numb'	,'수주번호'		), width: 120, align : 'center'
					},{
						text: Language.get('acpt_date'	,'수주일자'		), dataIndex : 'invc_date'	, align : 'center',
						columns: [
							{	text : Language.get('ordr_date'	,'발주일자'		), dataIndex: 'invc_date', align : 'center'
							}
						]
					},{
						text: Language.get('cstm_name'	,'거래처명'		), dataIndex : 'cstm_name'	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get('cstm_name'	,'발주처명'		), dataIndex: 'cstm_name', style: 'text-align:center;' , width : 150
							}
						]
					},{
						text: Language.get(''	,'제품명'		), dataIndex : 'prod_name'	, align : 'center', style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get(''	,'원단명(골)'		), dataIndex: 'prod_name', width : 200,  style: 'text-align:center; padding-left : 9px;'
							}
						]
					},{
						text: Language.get('prod_spec'	,'상자규격'		), dataIndex : 'prod_spec'	, align : 'center',
						columns: [
							{	text : Language.get('prod_spec'	,'원단규격'		), dataIndex: 'prod_spec', align : 'center'
							}
						]
					},{	dataIndex : 'item_fxqt'	, text : Language.get('item_fxqt'	,'절수'		), align : 'center', width:  50,
					},{
						text: Language.get('pcod_scre'	,'P/O NO'		), dataIndex : 'pcod_scre'	, style: 'text-align:center;', align:'left',
						columns: [
							{	text : Language.get('pcod_scre'	,'재단 및 스코어'		), dataIndex: 'pcod_scre', style: 'text-align:center;' ,
							}
						]
					},{
						text: Language.get('acpt_qntt'	,'수주량'		), dataIndex : 'qntt'	, style: 'text-align:center;', align:'right', xtype : 'numericcolumn',
						columns: [
							{	text : Language.get('qntt'	,'원자재량'		), dataIndex: 'qntt', style: 'text-align:center; padding-left : 9px;', align:'right', xtype : 'numericcolumn',
							}
						]
					},{
						text: Language.get('pqty_pric'	,'단가'		), dataIndex : 'pqty_pric'	, style: 'text-align:center;', align:'right', xtype : 'numericcolumn',
						columns: [
							{	text : Language.get('pqty_pric'	,'단가'		), dataIndex: 'pqty_pric', style: 'text-align:center; padding-left : 9px;', align:'right', xtype : 'numericcolumn',
							}
						]
					},{
						text: Language.get('sply_amnt'	,'공급가액'		), dataIndex : 'sply_amnt'	, style: 'text-align:center', align:'right', xtype : 'numericcolumn',
						columns: [
							{	text : Language.get('sply_amnt'	,'공급가액'		), dataIndex: 'sply_amnt', style: 'text-align:center; padding-left : 9px;', align:'right', xtype : 'numericcolumn',
							}
						]
					},{
						text: Language.get('unpaid'	,'미출고량'		), dataIndex : 'unpaid'	, style: 'text-align:center', align:'right', xtype : 'numericcolumn',
						columns: [
							{	text : Language.get('unpaid'	,'발주량'		), dataIndex: 'unpaid', style: 'text-align:center; padding-left : 9px;', align:'right', xtype : 'numericcolumn',
							}
						]
					},{	dataIndex : 'deli_date'	, text : Language.get('deli_date'	,'납기일자'		), width : 100 , align : 'center'
					},{	dataIndex : 'adtn_amnt'	, text : Language.get('adtn_amnt'	,'부가액'		), width :  80 , align : 'right' , xtype : 'numericcolumn',
					},{	dataIndex : 'user_memo'	, text : Language.get(''			,'비고'			), flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});