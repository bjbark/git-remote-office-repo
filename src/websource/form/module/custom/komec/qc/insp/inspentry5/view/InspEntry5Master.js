Ext.define('module.custom.komec.qc.insp.inspentry5.view.InspEntry5Master', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-inspentry5-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.komec.qc.insp.inspentry5.store.InspEntry5Master',
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
					{	text : '<span class="write-button">합격처리</span>', action : 'passAction', cls: 'button1-style'	},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId:'master' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'		, text : Language.get('spts_numb'		,'출고의뢰번호')		, width : 150 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('indn_date'		,'의뢰일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'bzpl_idcd'		, text : Language.get('bzpl_idcd'		,'사업장id')		, width : 100 , hidden:true
					},{ dataIndex: 'expt_dvcd'		, text : Language.get('expt_dvcd'		,'수출구분')		, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 180
					},{ dataIndex: 'cstm_idcd'		, text : Language.get('cstm_idcd'		,'거래처ID')		, width : 100 , hidden : true
					},{ dataIndex: 'ostt_dvcd'		, text : Language.get('ostt_dvcd'		,'출고구분')		, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('ostt_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'dttr_name'		, text : Language.get('dttr_name'		,'담당자명')		, width : 80
					},{ dataIndex: 'drtr_idcd'		, text : Language.get('drtr_idcd'		,'담당자ID')		, width : 80  , hidden : true
					},{ dataIndex: 'dept_idcd'		, text : Language.get('dept_idcd'		,'부서ID')		, width : 80  , hidden : true
					},{ dataIndex: 'ostt_schd_date'	, text : Language.get('ostt_schd_date'	,'출고예정일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'ostt_yorn'		, text : Language.get('ostt_yorn'		,'출고여부')		, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'ostt_date'		, text : Language.get('ostt_date'		,'출고일자')		, width : 100 , align : 'center'
					},{ dataIndex: 'trut_dvcd'		, text : Language.get('trut_dvcd'		,'위탁구분')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('trut_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'dlvy_cond_dvcd'	, text : Language.get('dlvy_cond_dvcd'	,'인도조건구분')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('dlvy_cond_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, width : 100 , align : 'center',
					},{ dataIndex: 'sale_stor_yorn'	, text : Language.get('sale_stor_yorn'	,'판매보관여부')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center', hidden : true
					},{ dataIndex: 'crny_dvcd'		, text : Language.get('crny_dvcd'		,'통화구분')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('crny_dvcd'), align : 'center', hidden : true
					},{ dataIndex: 'excg_rate'		, text : Language.get('excg_rate'		,'환율')			, width : 80  , xtype : 'numericcolumn', hidden : true
					},{ dataIndex: 'pcod_numb'		, text : Language.get('pcod_numb'		,'PONO')		, width : 180
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, flex : 100
					}
				]
			}
		;
		return item;
	}
});