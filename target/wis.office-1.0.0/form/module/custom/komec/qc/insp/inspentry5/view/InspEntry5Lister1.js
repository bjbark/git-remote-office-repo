Ext.define('module.custom.komec.qc.insp.inspentry5.view.InspEntry5Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-inspentry5-lister1',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.komec.qc.insp.inspentry5.store.InspEntry5Lister1',
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
					{	text : "<span>검사실적등록</span>", action : 'inspPopup' ,iconCls: Const.INSERT.icon,itemId:'insert' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId:'lister1'} , '-' ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'			, text : Language.get('invc_numb'		,'INVOICE번호')	, width : 60  , align : 'center' , hidden : true
					},{ dataIndex: 'line_seqn'			, text : Language.get('line_seqn'		,'항번')			, width : 50  , align : 'center'
					},{ dataIndex: 'acpt_numb'			, text : Language.get('acpt_numb'		,'수주번호')		, width : 120 , align : 'center'
					},{ dataIndex: 'acpt_seqn'			, text : Language.get('acpt_seqn'		,'수주항번')		, width : 55  , align : 'center'
					},{ dataIndex: 'item_name'			, text : Language.get('item_name'		,'품명')			, width : 160
					},{ dataIndex: 'item_spec'			, text : Language.get('item_spec'		,'규격')			, width : 160
					},{ dataIndex: 'item_idcd'			, text : Language.get('item_idcd'		,'품목ID')		, width : 120 , hidden : true
					},{ dataIndex: 'unit_name'			, text : Language.get('unit_name'		,'단위')			, width : 80
					},{ dataIndex: 'unit_idcd'			, text : Language.get('unit_idcd'		,'단위')			, width : 80  , hidden:true
					},{ dataIndex: 'norm_sale_pric'		, text : Language.get('norm_sale_pric'	,'정상판매단가')	, width : 90  , xtype:'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_stnd_pric'		, text : Language.get('sale_stnd_pric'	,'판매기준단가')	, width : 90  , xtype:'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_pric'			, text : Language.get('sale_pric'		,'판매단가')		, width : 80  , xtype:'numericcolumn'
					},{ dataIndex: 'trst_qntt'			, text : Language.get('trst_qntt'		,'의뢰수량')		, width : 80  , xtype:'numericcolumn'
					},{ dataIndex: 'vatx_incl_yorn'		, text : Language.get('vatx_incl_yorn'	,'부가세포함여부')	, width : 90  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')	, hidden : true
					},{ dataIndex: 'vatx_rate'			, text : Language.get('vatx_rate'		,'부가세율')		, width : 80  , xtype:'numericcolumn'	, hidden : true
					},{ dataIndex: 'sale_amnt'			, text : Language.get('sale_amnt'		,'판매금액')		, width : 80  , xtype:'numericcolumn'
					},{ dataIndex: 'vatx_amnt'			, text : Language.get('vatx_amnt'		,'부가세')		, width : 80  , xtype:'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'			, text : Language.get('ttsm_amnt'		,'합계금액')		, width : 80  , xtype:'numericcolumn'
					},{ dataIndex: 'deli_date'			, text : Language.get('deli_date'		,'납기일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'stnd_unit'			, text : Language.get('stnd_unit'		,'기준단위')		, width : 80  , align : 'center'	, hidden : true
					},{ dataIndex: 'stnd_unit_qntt'		, text : Language.get('stnd_unit_qntt'	,'기준단위수량')	, width : 90  , xtype:'numericcolumn'	, hidden : true
					},{ dataIndex: 'wrhs_idcd'			, text : Language.get('wrhs_idcd'		,'창고ID')		, width : 100 , align : 'center', hidden:true
					},{ dataIndex: 'dlvy_cstm_idcd'		, text : Language.get('dlvy_cstm_idcd'	,'납품거래처ID')	, width : 100 , align : 'center', hidden:true
					},{ dataIndex: 'dsct_yorn'			, text : Language.get('dsct_yorn'		,'중단여부')		, width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')	, hidden : true
					},{ dataIndex: 'ostt_dvcd'			, text : Language.get('ostt_dvcd'		,'출고구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd')	, hidden : true
					},{ dataIndex: 'insp_dvcd'			, text : Language.get('insp_dvcd'		,'검사구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_dvcd')
					},{ dataIndex: 'insp_date'			, text : Language.get('insp_date'		,'검사일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'insp_mthd_dvcd'		, text : Language.get('insp_mthd_dvcd'	,'검사방법')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')
					},{ dataIndex: 'insp_qntt'			, text : Language.get('insp_qntt'		,'검사수량')		, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'pass_qntt'			, text : Language.get('pass_qntt'		,'합격수량')		, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'poor_qntt'			, text : Language.get('poor_qntt'		,'불량수량')		, width : 100 , xtype:'numericcolumn'
					},{ dataIndex: 'judt_dvcd'			, text : Language.get('judt_dvcd'		,'판정구분')		, width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('judt_dvcd')
					},{ dataIndex: 'pcod_numb'			, text : Language.get('pcod_numb'		,'PONO')		, width : 100 , align : 'center'
					},{ dataIndex: 'ostt_yorn'			, text : Language.get('ostt_yorn'		,'출고여부')		, width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'ostt_date'			, text : Language.get('ostt_date'		,'출고일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'ostt_qntt'			, text : Language.get('ostt_qntt'		,'출고수량')		, width : 80  , xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	},

	deleteItem : function() {
		var	tempa = this.up('grid'),
			store = this.up('grid').getStore(),
			selectItem = tempa.getSelectionModel().selected.items[0].data,
			line_seqn = selectItem.line_seqn,
			invc_numb = selectItem.invc_numb,
			_set = 'delete'
		;
		Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
			if(button=='yes'){
				record = Ext.create( store.model.modelName , {
					invc_numb: invc_numb,
					line_seqn: line_seqn,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						store.reload();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : _set} );
			}
		});
	}
});