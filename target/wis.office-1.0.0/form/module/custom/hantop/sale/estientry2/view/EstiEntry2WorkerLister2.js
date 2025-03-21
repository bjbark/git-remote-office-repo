Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerLister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-estientry2-worker-lister2',
	store	: 'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail3',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'sbsc_name'			, width:  230, align : 'left'   , text: Language.get( 'sbsc_name'	, '항목명'		)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '기타견적 항목 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '9001' },
										result	: function(records) {
											var	rec = records[0]
											;
											record.set('sbsc_bacd', rec.data.base_code);
											record.set('sbsc_name', rec.data.base_name);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'esti_amnt'			, width : 100, align : 'right'	, text: Language.get('esti_amnt'			, '견적금액'	), xtype : 'numericcolumn' , format: '#,##0',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[2]);
									}
								}
							}
						}
					},{	dataIndex:	'vatx_amnt'			, width : 100, align : 'right'	, text: Language.get('vatx_amnt'			, '부가세액'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'ttsm_amnt'			, width : 100, align : 'right'	, text: Language.get('ttsm_amnt'			, '합계금액'	), xtype : 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'sbsc_bacd'			, width :  80, align : 'center'	, text: Language.get('sbsc_bacd'			, '항목분류코드'	), hidden : true
					},{	dataIndex:	'esti_qntt'			, width : 100, align : 'right'	, text: Language.get('esti_qntt'			, '견적수량'	), xtype : 'numericcolumn' , format: '#,##0', hidden : true
					},{	dataIndex:	'esti_pric'			, width : 100, align : 'right'	, text: Language.get('esti_pric'			, '견적단가'	), xtype : 'numericcolumn' , format: '#,##0',
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;

		var esti_qntt		= this.getSelectionModel().getSelection()[0].data.esti_qntt;		//견적수량
		var esti_pric		= this.getSelectionModel().getSelection()[0].data.esti_pric;		//단가
		var esti_amnt		= this.getSelectionModel().getSelection()[0].data.esti_amnt;		//공급가
		var vatx_amnt		= this.getSelectionModel().getSelection()[0].data.vatx_amnt;		//부가세
		var ttsm_amnt		= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;		//합계금액

		var vatx		= Math.floor(esti_amnt*0.1);			//부가세
		var ttsm		= esti_amnt+vatx;						//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(esti_amnt > 0){
			models[pos].set('esti_pric', esti_amnt * esti_qntt);
			models[pos].set('vatx_amnt', vatx);
			models[pos].set('ttsm_amnt', ttsm);
		}else if(esti_amnt < 0){
			Ext.Msg.alert("알림", "금액을 다시 입력하여 주십시오.");
			models[pos].set('esti_amnt', 0);
			models[pos].set('vatx_amnt', 0);
			models[pos].set('ttsm_amnt', 0);
		}

	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			editor		= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0]
		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;

		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			amnd_degr		: '1',
			esti_qntt		: '1',
			crte_dttm		: Ext.Date.format(new Date(), 'Ymd'),
		});

		store.add(record);
		record.commit();
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
//						me.getStore().commitChanges();
						Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=change]').setValue('Y');
					}
				}
			});
		}
	},

});
