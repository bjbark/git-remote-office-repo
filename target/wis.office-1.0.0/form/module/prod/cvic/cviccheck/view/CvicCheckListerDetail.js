Ext.define('module.prod.cvic.cviccheck.view.CvicCheckListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-cviccheck-lister-detail',
	store		: 'module.prod.cvic.cviccheck.store.CvicCheckDetail',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 50  ,align : 'center'
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'점검일자')		, width : 80 , align : 'center'
					},{ dataIndex: 'chek_name'		, text : Language.get('chek_name'		,'점검명')			, width : 170
					},{ dataIndex: 'nxrm_chek_date'	, text : Language.get('nxrm_chek_date'	,'차기점검일자')		, width : 80 , align : 'center'
					},{ dataIndex: 'repa_entr_name'	, text : Language.get('repa_entr_name'	,'수리업체명')		, width : 130
					},{ dataIndex: 'repa_need_time'	, text : Language.get('repa_need_time'	,'소요시간')		, width : 80, align : 'center'
					},{ dataIndex: 'chek_resn'		, text : Language.get('chek_resn'		,'점검사유')		, width : 150
					},{ dataIndex: 'repa_sbsc_name'	, text : Language.get('repa_sbsc_name'	,'수리항목명')		, width : 130
					},{ dataIndex: 'repa_cont'		, text : Language.get('repa_cont'		,'수리내용')		, width : 150,
					},{ dataIndex: 'need_amnt'		, text : Language.get('need_amnt'		,'소요금액')		, width : 100 , align : 'right', xtype: 'numericcolumn' ,  format:  '#,###,##0원'
					},{ dataIndex: 'dmge_regn'		, text : Language.get('dmge_regn'		,'고장부위')		, width : 120
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')			, flex  : 100
					},{ dataIndex: 'cvic_idcd'		, text : Language.get('cvic_idcd'		,'설비ID')		, hidden  : true
					},{ dataIndex: 'chek_date'		, text : Language.get('chek_date'		,'점검일자')		, hidden  : true
					}
				]
			}
		;
		return item;
	}
});