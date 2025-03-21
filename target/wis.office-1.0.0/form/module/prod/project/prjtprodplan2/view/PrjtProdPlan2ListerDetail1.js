Ext.define('module.prod.project.prjtprodplan2.view.PrjtProdPlan2ListerDetail1', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-prjtprodplan2-lister-detail1',
	store		: 'module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail1',
	border		: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,
	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
	},
	initComponent: function () {
		var me = this;
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">승인</span>'	, action : 'approveAction'		, cls: 'button-style', hidden   : !_global.auth.auth_prod_1001} ,
					{	text : '<span class="write-button">해제</span>'	, action : 'approveCancel'		, cls: 'button-style', hidden   : !_global.auth.auth_prod_1001} ,
					{	text : '<span class="write-button">부품식별표 발행</span>', action : 'bomReport', cls: 'button-style', width: 100	} ,
//					{	text : '<span class="write-button">test</span>', action : 'test', cls: 'button-style', width: 100	} ,
					'->', '-' ,
					{text : '<span class="write-button">일정복사</span>'	, action : 'project_schd_copy'			, cls: 'button1-style'	} , '-',
					{text : '<span class="write-button">작업지시</span>'	, action : 'workAction'			, cls: 'button1-style'	} , '-',
					{text : '<span class="write-button" style="line-height:15px;">대일정조회</span>'		, action : 'changeAction'	, cls: 'button1-style', width: 80, hidden : _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false} , '-' ,
					{text : '<span class="write-button">일정조정</span>'	, action : 'changeAction2'		, cls: 'button1-style'} , '-' ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action	, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

		item = {
				itemId : 'sub',
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items : [
					{ dataIndex: 'work_stat_dvcd'	, text : Language.get('work_stat_dvcd'		,'상태')		, width : 80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('work_stat_dvcd'), align : 'center'
					},{	text	: '작업내용'	, dataIndex: 'text'	, width : 200	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ record.data.item_name+'</span>' : record.data.item_name  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'작업코드')		, width : 300 , align : 'center',hidden:true
					},{ dataIndex: 'work_days'	, text : Language.get('work_days'	,'소요일수')		, width :  80 , xtype : 'numericcolumn'
					},{ dataIndex: 'due_days'	, text : Language.get('due_days'	,'지연일수')		, width :  80 , xtype : 'numericcolumn'
					},{ dataIndex: 'achi_rate'	, text : Language.get('achi_rate'	,'진행률')			, width :  70 , xtype : 'numericcolumn'
					},{ dataIndex: 'stdt'		, text : Language.get('stdt'		,'착수예정일')		, width : 110 , align : 'center'
					},{ dataIndex: 'eddt'		, text : Language.get('eddt'		,'종료예정일')		, width : 110 , align : 'center',
					},{ dataIndex: 'otod_yorn'	, text : '외주여부'										, width :  60 , xtype : 'checkcolumn'
					},{ dataIndex: 'cvic_idcd'	, text : Language.get('cvic_idcd'	,'설비ID')		, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비')			, width : 120 , align : 'center',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '설비찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var chek = "6";
									var wc_idcd = "";
									if(record.get('otod_yorn')){
										chek="3";
									}
									if(record.get('wkct_idcd')){
										wc_idcd = record.get('wkct_idcd');
									}
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-offe-popup',
										params:{
											cstm_dvcd : chek , wkct_idcd : wc_idcd
										},
										result	: function(records) {
											var	parent = records[0];
											record.set('cvic_idcd',parent.data.offe_idcd);
											record.set('cvic_name',parent.data.offe_name);
										},
										create : function (self ) {
											var panel = self.up('form'),
												code_dvcd = panel.down('[name=otod_yorn]').getValue()
												console.debug('code_dvcd',chek);
											Ext.merge(self.popup.params, {
											});
										}
									})
								},
								scope : me
							}
						]
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls: Const.INSERT.icon,
								tooltip	: '이미지',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'module-prjtprodplan2-popup-bom',
										params	:{
											pjod_idcd		: record.get('pjod_idcd'),
											work_schd_dvcd	: record.get('work_schd_dvcd'),
											work_ordr_dvcd	: record.get('work_ordr_dvcd'),
											ordr_degr		: record.get('ordr_degr'),
											id				: record.get('gant_id')
										}
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업오더구분코드')	, hidden:true
					},{ dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'오더차수')			, hidden:true
					},{ dataIndex: 'wkct_idcd'		, text : Language.get('wkct_idcd'		,'공정ID')			, hidden:true
//					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')				, flex  : 100
					},{ dataIndex: 'gant_id'		, text : Language.get('gant_id'			,'gant_id')				, hidden:true
					},{ dataIndex: 'idcd'			, text : Language.get('idcd'			,'idcd')				, hidden:true
					},{ dataIndex: 'gant_seqn'		, text : Language.get('gant_seqn'		,'gant_seqn')				, hidden:true
					},{ dataIndex: 'line_levl'		, text : Language.get('line_levl'		,'line_levl')				, hidden:true
					}
				]
			}
		;
		return item;
	}
});