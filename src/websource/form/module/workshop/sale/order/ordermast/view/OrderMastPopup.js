Ext.define('module.workshop.sale.order.ordermast.view.OrderMastPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-ordermast-popup'			,

	title: '표지 등록',

	closable: true,
	autoShow: true,
	width: 505,
	height: 310,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		show:function(){
			if(!this.popup.params.invc_numb){
				Ext.Msg.alert('알림','항목을 선택하여주세요.');
				this.hide();
			}
		},
	},
	createForm: function(){
		var me = this, form =
		{
			xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	:
			[
				{
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	:
					[
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				}
			],
			items : [ me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			itemId	: 'shet',
			border	: false,
			layout	: { type: 'vbox', /*align: 'stretch'*/} ,
			items	: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '20 0 5 10',
						items	: [
						{	fieldLabel	: Language.get('bkbd_kind_name','제본'),
							xtype		: 'popupfield'	,
							name		: 'bkbd_kind_name',
							pair		: 'bkbd_kind_idcd',
							itemId		: 'bkbd_kind_name',
							value		: me.popup.params.bkbd_kind_name,
							labelWidth	: 60,
							width		: 180,
							clearable	: true,
							popup		: {
								widget	: 'lookup-item-clss-popup2',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', prnt_idcd : '000053' }, // TODO 제본종류 강제로 prnt_idcd 넣어둠 수정해야함
								result	: function(records, nameField, pairField ) {
									var record = records[0];
									nameField.setValue(record.get('clss_name'));
									pairField.setValue(record.get('clss_idcd'));
								}
							},
						},{	xtype : 'textfield', hidden: true , name : 'bkbd_kind_idcd',value		: me.popup.params.bkbd_kind_idcd,
							listeners:{
								change	: function(){
									me.down('[name=shet_name_covr]').popup.params.scls_idcd = this.getValue();
									if(this.value == ''){
										me.down('[name=bkbd_kind_idcd]').setValue(null);
										me.down('[name=shet_name_covr]').popup.params.scls_idcd = null;
									}
								}
							}
						},{ fieldLabel	: Language.get('bkbd_dirt_dvcd','제본방향'),
							xtype		: 'lookupfield'	,
							name		: 'bkbd_dirt_dvcd',
							itemId		: 'bkbd_dirt_dvcd',
							value		: me.popup.params.bkbd_dirt_dvcd,
							labelWidth	: 65,
							width		: 150,
							lookupValue	: resource.lookup('bkbd_dirt_dvcd')
						},{	fieldLabel	: Language.get('','Invoice No'),
							name		: 'invc_numb',
							itemId		: 'invc_numb',
							xtype		: 'textfield',
							value		: me.popup.params.invc_numb,
							hidden		: true
						},{	fieldLabel	: Language.get('','순번'),
							name		: 'line_seqn',
							itemId		: 'line_seqn',
							xtype		: 'numericfield',
							value		: me.popup.params.line_seqn,
							hidden		: true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('shet_name','용지'),
							name		: 'shet_name_covr',
							pair		: 'shet_idcd_covr',
							itemId		: 'shet_name_covr',
							value		: me.popup.params.shet_name_covr,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							labelWidth	: 60,
							width		: 180,
							popup		: {
								widget	: 'lookup-shet-popup-workshop',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0'},
								result	: function(records, nameField, pairField ) {
									var panel1 = nameField.up('form');
									var layout = ('[name=esti_idcd]');
									var record = records[0];
									panel1.down('[name=assi_seqn]').setValue(records[0].get('line_seqn'));
									panel1.down('[name=covr_shet_wght]').setValue(records[0].get('shet_wght'));
									nameField.setValue(record.get('shet_name'));
									pairField.setValue(record.get('shet_idcd'));
								},
								create : function (self ) {
									if((me.down('[name=bkbd_kind_idcd]')).value == '' || ((me.down('[name=bkbd_kind_idcd]')).value == null)){
										Ext.Msg.alert("알림","제본을 먼저 선택하여 주십시오.");
										popup.close();
										return;
									}
								}
							},
						},{	name : 'shet_idcd_covr', xtype	: 'textfield', hidden : true , value		: me.popup.params.shet_idcd_covr,
						},{	name : 'assi_seqn'		, xtype	: 'numericfield', hidden : true
						},{	fieldLabel	: Language.get('','평량'),
							xtype		: 'numericfield',
							name		: 'covr_shet_wght',
							itemId		: 'covr_shet_wght',
							value		: me.popup.params.covr_shet_wght,
							readOnly	: true,
							labelWidth	: 65,
							width		: 150,
						}
//							,{	fieldLabel	: Language.get('','컬러'),
//								xtype		: 'lookupfield'	,
//								name		: 'prnt_colr_bacd',
//								labelWidth	: 60,
//								width		: 140,
//								lookupValue	: resource.lookup('prnt_mthd_dvcd')
//							}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('dsgn_code','디자인번호'),
							name		: 'dsgn_code',
							itemId		: 'dsgn_code',
							xtype		: 'textfield',
							labelWidth	: 60,
							width		: 180,
							value		: me.popup.params.dsgn_code,
						},{	fieldLabel	: Language.get('covr_dsgn_dvcd','디자인구분'),
							xtype		: 'lookupfield'	,
							name		: 'covr_dsgn_dvcd',
							itemId		: 'covr_dsgn_dvcd',
							lookupValue	: resource.lookup('covr_dsgn_dvcd'),
							labelWidth	: 65,
							width		: 150,
							value		: me.popup.params.covr_dsgn_dvcd,
						},{	fieldLabel	: Language.get('esti_amnt','견적가'),
							name		: 'esti_amnt_covr',
							itemId		: 'esti_amnt_covr',
							xtype		: 'numericfield',
							labelWidth	: 60,
							width		: 140,
							value		: me.popup.params.esti_amnt_covr,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('shet_name','코팅'),
							name		: 'shet_name_coti',
							itemId		: 'shet_name_coti',
							pair		: 'proc_shet_idcd',
							value		: me.popup.params.shet_name_coti,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							labelWidth	: 60,
							width		: 180,
							popup		: {
								widget	: 'lookup-shetitem-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',lcls_idcd : '000048', scls_idcd  : '000060',mcls_idcd : '000052'},
								result	: function(records, nameField, pairField ) {
									var record = records[0];
									nameField.setValue(record.get('shet_name'));
									pairField.setValue(record.get('shet_idcd'));
								},
							},
						},{	name : 'proc_shet_idcd', xtype	: 'textfield', hidden : true,value		: me.popup.params.proc_shet_idcd,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('fcvr_strg','앞표지'),
							name		: 'fcvr_strg',
							itemId		: 'fcvr_strg',
							xtype		: 'textfield',
							labelWidth	: 60,
							width		: 420,
							value		: me.popup.params.fcvr_strg,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('scvr_strg','측면'),
							name		: 'scvr_strg',
							itemId		: 'scvr_strg',
							xtype		: 'textfield',
							labelWidth	: 60,
							width		: 420,
							value		: me.popup.params.scvr_strg,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
					items	: [
						{	fieldLabel	: Language.get('bcvr_strg','뒷표지'),
							name		: 'bcvr_strg',
							itemId		: 'bcvr_strg',
							xtype		: 'textfield',
							labelWidth	: 60,
							width		: 420,
							value		: me.popup.params.bcvr_strg,
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 *
	 * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction : function (button) {
		var me	= this,
			baseform	= me.down('form'),
			record		= baseform.getRecord(),
			values		= baseform.getValues(),
			tree		= Ext.ComponentQuery.query('module-ordermast-tree')[0]
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/workshop/sale/order/ordermast/set/covr.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: values.invc_numb,
					line_seqn		: values.line_seqn,
					bkbd_kind_idcd	: values.bkbd_kind_idcd,
					bkbd_dirt_dvcd	: values.bkbd_dirt_dvcd,
					shet_idcd_covr	: values.shet_idcd_covr,
					covr_shet_wght	: values.covr_shet_wght,
					dsgn_code		: values.dsgn_code,
					covr_dsgn_dvcd	: values.covr_dsgn_dvcd,
					esti_amnt_covr	: values.esti_amnt_covr,
					proc_shet_idcd	: values.proc_shet_idcd,
					shet_name_coti	: values.shet_name_coti,
					fcvr_strg		: values.fcvr_strg,
					scvr_strg		: values.scvr_strg,
					bcvr_strg		: values.bcvr_strg,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
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
					me.close();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});