Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderConsultingPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleorder-consulting-popup',

	title		: '상담등록',
	closable	: true,
	autoShow	: true,
	width		: 430,
	height		: 430,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth :95, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('pjod_idcd', '금형번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											itemId		: 'invc_numb',
											width		: 370,
											readOnly	: true
										},{ fieldLabel	: '순번',
											xtype		: 'numericfield',
											name		: 'line_seqn',
											itemId		: 'line_seqn',
											width		: 150,
											readOnly	: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '상담일시',
											xtype		: 'datefield',
											name		: 'cnsl_dttm1',
											itemId		: 'cnsl_dttm1',
											width		: 210,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	xtype		: 'timefield',
											name		: 'cnsl_dttm2',
											itemId		: 'cnsl_dttm2',
											readOnly	: false,
											format		: 'H:i',
											submitFormat: 'Hi',
											increment	: 30,
											margin		: '0 0 0 5',
											width		: 75,
											anchor		: '100%'
										}
									]
								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '상담자',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'drtr_name',
											itemId		: 'drtr_name',
											pair		: 'drtr_idcd',
											allowBlank	: true,
											clearable	: false ,
											width		: 210,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name	: 'drtr_idcd', xtype : 'textfield' ,itemId		: 'drtr_idcd', hidden : true
										},{	fieldLabel	: '고객부서명',
											xtype		: 'textfield',
											name		: 'cstm_dept_name',
											width		: 370
										},{	fieldLabel	: '거래처담당자명',
											xtype		: 'textfield',
											name		: 'cstm_drtr_name',
											width		: 370
										},{	fieldLabel	: '상담내용',
											xtype		: 'htmleditor',
											name		: 'cnsl_cont',
											width		: 370,
											height		: 150
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store = Ext.ComponentQuery.query('module-saleorder-lister-detail2')[0].getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/order/saleorder/set/consulting.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					records :[{
						_set			: 'insert',
						invc_numb		: values.invc_numb,
						line_seqn		: values.line_seqn,
						cnsl_dttm		: values.cnsl_dttm1 + values.cnsl_dttm2 + '00',
						drtr_idcd		: values.drtr_idcd,
						cstm_dept_name	: values.cstm_dept_name,
						cstm_drtr_name	: values.cstm_drtr_name,
						cnsl_cont		: values.cnsl_cont,
						cost_yorn		: values.cost_yorn,
						dsig_yorn		: values.dsig_yorn,
						puch_yorn		: values.puch_yorn,
						otod_yorn		: values.otod_yorn,
						prod_yorn		: values.prod_yorn
					}]
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);

				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
				store.reload();
			}
		});
	}
});
