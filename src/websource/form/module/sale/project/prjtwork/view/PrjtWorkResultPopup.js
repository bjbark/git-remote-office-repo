Ext.define('module.sale.project.prjtwork.view.PrjtWorkResultPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prjtwork-result-popup',

	title		: '상담 결과입력',
	closable	: true,
	autoShow	: true,
	width		: 430 ,
	height		: 430 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
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
							fieldDefaults: { width : 300, labelWidth :105, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('pjod_idcd', '금형번호'),
											name		: 'pjod_idcd',
											xtype		: 'textfield',
											itemId		: 'pjod_idcd',
											width		: 370,
											readOnly	: true
										},{	fieldLabel	: '순번',
											xtype		: 'numericfield',
											name		: 'line_seqn',
											itemId		: 'line_seqn',
											width		: 160,
											readOnly	: true
										}
									]
								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('rply_mthd_dvcd','회신방법구분'),
											name		: 'rply_mthd_dvcd',
											xtype		: 'lookupfield',
											lookupValue	: resource.lookup('rply_mthd_dvcd')	,
											width		: 210
										},{	fieldLabel	: '회신담당자',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'rply_drtr_name',
											pair		: 'rply_drtr_idcd',
											itemId		: 'rply_drtr_name',
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
										},{	name	: 'rply_drtr_idcd',itemId : 'rply_drtr_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '회신일시',
											xtype		: 'datefield',
											name		: 'rply_dttm1',
											width		: 210,
											itemId		: 'rply_dttm1',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	xtype		: 'timefield',
											name		: 'rply_dttm2',
											readOnly	: false,
											itemId		: 'rply_dttm2',
											format		: 'H:i',
											submitFormat: 'Hi',
											increment	: 30,
											margin		: '0 0 0 8',
											width		: 95,
											anchor		: '100%'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('puch_yorn','구매여부'),
											name		: 'puch_yorn',
											xtype		: 'lookupfield',
											lookupValue	: resource.lookup('yorn'),
											width		: 187
										},{	fieldLabel	: Language.get('otod_yorn','외주여부'),
											name		: 'otod_yorn',
											xtype		: 'lookupfield',
											lookupValue	: resource.lookup('yorn'),
											labelWidth	: 100,
											width		: 182
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: '회신내용',
											xtype		: 'htmleditor',
											name		: 'rply_cont',
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
			store	= Ext.ComponentQuery.query('module-prjtwork-lister-detail4')[0].getStore(),
			select	= Ext.ComponentQuery.query('module-prjtwork-lister-detail4')[0].getSelectionModel().getSelection()[0]
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/project/prjtwork/set/result.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					records :[{
						_set			: 'update',
						cnsl_dttm		: select.cnsl_dttm,
						drtr_idcd		: select.drtr_idcd,
						cstm_dept_name	: select.cstm_dept_name,
						cstm_drtr_name	: select.cstm_drtr_name,
						cnsl_cont		: select.cnsl_cont,
						cost_yorn		: select.cost_yorn,
						dsig_yorn		: select.dsig_yorn,
						puch_yorn		: select.puch_yorn,
						otod_yorn		: select.otod_yorn,
						prod_yorn		: select.prod_yorn,
						pjod_idcd		: values.pjod_idcd,
						line_seqn		: values.line_seqn,
						rply_reqt_yorn	: values.rply_reqt_yorn,
						rply_mthd_dvcd	: values.rply_mthd_dvcd,
						rply_drtr_idcd	: values.rply_drtr_idcd,
						rply_dttm		: values.rply_dttm1 + values.rply_dttm2 + '00',
						rply_cont		: values.rply_cont
					}]
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				Ext.Msg.alert("알림", "결과입력이 완료 되었습니다.");
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
