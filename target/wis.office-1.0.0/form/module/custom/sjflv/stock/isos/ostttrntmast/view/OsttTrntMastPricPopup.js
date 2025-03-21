Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastPricPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sjflv-ostttrntmast-pric-popup',

	title		: '운송비등록',
	closable	: true,
	autoShow	: true,
	width		: 450 ,
	height		: 310,
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
			margin	: '15 7 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: Language.get('','출고유형'),
							xtype		: 'lookupfield',
							name		: 'ostt_yorn',
							value		: me.params.data.ostt_yorn,
							lookupValue : [ ['1','제품출고'], ['0','기타출고'] ],
							labelWidth	: 80,
							width		: 175,
							margin		: '0 0 0 0',
							readOnly	: Ext.isEmpty(me.params.data.invc_numb) ? false : true,
							listeners	: {
								beforeselect: function(self, value, index, eOpts ) {
									if (value.get('code') == "1") {
										me.down('[name=ostt_numb]').show();
										me.down('[name=invc_date]').setValue(null);
										me.down('[name=invc_date]').setReadOnly(true);
										me.down('[name=cstm_name]').setReadOnly(true);
										me.down('[name=dlvy_cstm_name]').setReadOnly(true);
									} else {
										//
										me.down('[name=invc_date]').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
										me.down('[name=invc_date]').setReadOnly(false);
										me.down('[name=ostt_numb]').hide();
										me.down('[name=ostt_numb]').setValue(null);
										me.down('[name=cstm_name]').setReadOnly(false);
										me.down('[name=dlvy_cstm_name]').setReadOnly(false);
									}
								}
							}
						},{	fieldLabel	: Language.get('', '출고번호' ),
							name		: 'ostt_numb',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							labelWidth	: 50,
							width		: 175,
							margin		: '0 0 0 0',
							value		: me.params.data.ostt_numb,
							hidden		: me.params.data.ostt_yorn == '1' ? false : true,
							popup		: {
								widget	: 'lookup-ostttrntmast-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', line_clos : '0'},
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('invc_numb'));
									me.down('[name=invc_date]').setValue(records[0].get('invc_date'));
									me.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
									me.down('[name=cstm_idcd]').setValue(records[0].get('cstm_idcd'));
									me.down('[name=dlvy_cstm_name]').setValue(records[0].get('dlvy_cstm_name'));
									me.down('[name=dlvy_cstm_idcd]').setValue(records[0].get('dlvy_cstm_idcd'));
								}
							},
							listeners	: {
								change:function(){
									var val = this.getValue();
									if (val == ""){
										me.down('[name=invc_date]').setValue("");
										me.down('[name=cstm_name]').setValue("");
										me.down('[name=cstm_idcd]').setValue("");
										me.down('[name=dlvy_cstm_name]').setValue("");
										me.down('[name=dlvy_cstm_idcd]').setValue("");
									}
								},
							}
						}

					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('invc_date','출고일자'),
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls	: 'requiredindex',
							allowBlank	: true,
							name		: 'invc_date',
							value		: me.params.data.invc_date,
							labelWidth	: 80,
							width		: 175,
							readOnly	: Ext.isEmpty(me.params.data.invc_numb) ? me.params.data.ostt_yorn == "1" ? true : false : me.params.data.ostt_yorn == "1" ? true : false,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('cstm_name', '거래처' ),
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							allowBlank	: true,
							clearable	: true,
							labelWidth	: 80,
							value		: me.params.data.cstm_name,
							readOnly	: Ext.isEmpty(me.params.data.invc_numb) ? me.params.data.ostt_yorn == "1" ? true : false : me.params.data.ostt_yorn == "1" ? true : false,
							popup		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield', value : me.params.data.cstm_idcd, hidden : true,
							listeners	: {
								change	: function(){
									me.down('[name=dlvy_cstm_name]').popup.params.cstm_idcd = this.getValue();

									me.down('[name=dlvy_cstm_idcd]').setValue(null);
									me.down('[name=dlvy_cstm_name]').setValue(null);
								}
							},
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('', '납품처' ),
							name		: 'dlvy_cstm_name',
							pair		: 'dlvy_cstm_idcd',
							xtype		: 'popupfield',
							clearable	: true,
							editable	: true,
							enableKeyEvents : true,
							labelWidth	: 80,
							value		: me.params.data.dlvy_cstm_name,
							readOnly	: Ext.isEmpty(me.params.data.invc_numb) ? me.params.data.ostt_yorn == "1" ? true : false : me.params.data.ostt_yorn == "1" ? true : false,
							popup		: {
								widget	: 'lookup-cstm-deli-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1'},
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('dely_cstm_name'));
									pairField.setValue(records[0].get('dlvy_cstm_idcd'));

								},
								create : function (self ) {
									var cstm_idcd = me.down('[name=cstm_idcd]').getValue();
									if (cstm_idcd == '' || cstm_idcd == null ){
										Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
										popup.close();
										return;
									}
								}
							}
						},{	name : 'dlvy_cstm_idcd', xtype	: 'textfield', value : me.params.data.dlvy_cstm_idcd, hidden : true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dlvy_mthd_dvcd','운송방법'),
							xtype		: 'lookupfield',
							name		: 'dlvy_mthd_dvcd',
							value		: me.params.data.dlvy_mthd_dvcd,
							lookupValue : resource.lookup('dlvy_mthd_dvcd'),
							labelWidth	: 80,
							width		: 175,
							margin		: '0 0 0 0',
							listeners	: {
								beforeselect: function(self, value, index, eOpts ) {
									if (value.get('code') == "01") {
										me.down('[name=hdco_name]').show();
										me.down('[name=hdco_name]').setValue(me.params.data.hdco_name);
										me.down('[name=hdco_idcd]').setValue(me.params.data.hdco_idcd);
									}else{
										me.down('[name=hdco_name]').hide();
										me.down('[name=hdco_name]').setValue();
										me.down('[name=hdco_idcd]').setValue();
									}
								}
							}
						},{	xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'hdco_name',
							value		: me.params.data.hdco_name,
							width		: 80,
							pair		: 'hdco_idcd',
							editable	: true,
							clearable	: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-hdco-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0'},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('hdco_name'));
									pairField.setValue(records[0].get('hdco_idcd'));
								}
							},
							margin		: '1 0 0 5',
							hidden		: me.params.data.dlvy_mthd_dvcd == '01' ? false : true
						},{	name		: 'hdco_idcd', xtype : 'textfield' , value : me.params.data.hdco_idcd, hidden : true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dlvy_exps','운송비용'),
							xtype		: 'numericfield',
							name		: 'dlvy_exps',
							value		: me.params.data.dlvy_exps,
							labelWidth	: 80,
							width		: 175,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dlvy_taxn_yorn','부가세포함'),
							xtype		: 'lookupfield',
							name		: 'dlvy_taxn_yorn',
							value		: me.params.data.dlvy_taxn_yorn,
							lookupValue : resource.lookup('yorn'),
							labelWidth	: 80,
							width		: 175,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dlvy_memo','운송비고'),
							xtype		: 'textfield',
							name		: 'dlvy_memo',
							value		: me.params.data.dlvy_memo,
							labelWidth	: 80,
							width		: 300,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				},{	xtype:'textfield', name : 'invc_numb',value	: me.params.data.invc_numb, hidden : true
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
			master	= Ext.ComponentQuery.query('module-ostttrntmast-lister-master1')[0]
		;

		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","출고일자를 반드시 선택해주세요.");
			return;
		}

		if(values.cstm_idcd==''||values.cstm_idcd==null){
			Ext.Msg.alert("알림","거래처를 반드시 선택해주세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/stock/ostttrntmast/set/setTrntCost.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: values.invc_numb,
					ostt_yorn		: values.ostt_yorn,
					dlvy_dinv_numb	: values.ostt_numb,
					invc_date		: values.invc_date,
					cstm_idcd		: values.cstm_idcd,
					dlvy_cstm_idcd	: values.dlvy_cstm_idcd,
					dlvy_mthd_dvcd  : values.dlvy_mthd_dvcd,
					hdco_idcd		: values.hdco_idcd,
					dlvy_exps		: values.dlvy_exps,
					dlvy_taxn_yorn	: values.dlvy_taxn_yorn,
					dlvy_memo		: values.dlvy_memo,

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
					Ext.Msg.alert("알림", "운송비 등록이 완료 되었습니다.");
					master.getStore().reload();
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	}
});
